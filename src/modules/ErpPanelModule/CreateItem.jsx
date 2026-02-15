import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import { Button, Tag, Form, Divider } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';

import { useSelector, useDispatch } from 'react-redux';

import useLanguage from '@/locale/useLanguage';

import { settingsAction } from '@/redux/settings/actions';
import { erp } from '@/redux/erp/actions';
import { selectCreatedItem } from '@/redux/erp/selectors';

import calculate from '@/utils/calculate';
import { generate as uniqueId } from 'shortid';

import Loading from '@/components/Loading';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';

function SaveForm({ form }) {
  const translate = useLanguage();
  const handelClick = () => {
    form.submit();
  };

  return (
    <Button onClick={handelClick} type="primary" icon={<PlusOutlined />}>
      {translate('Save')}
    </Button>
  );
}

export default function CreateItem({ config, CreateForm }) {
  const translate = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(settingsAction.list({ entity: 'setting' }));
  }, []);
  let { entity } = config;

  const { isLoading, isSuccess, result } = useSelector(selectCreatedItem);
  const [form] = Form.useForm();
  const [subTotal, setSubTotal] = useState(0);
  const [offerSubTotal, setOfferSubTotal] = useState(0);
  const handelValuesChange = (changedValues, values) => {
    const items = values['items'];
    let subTotal = 0;
    let subOfferTotal = 0;

    if (items) {
      items.map((item) => {
        if (item) {
          if (item.offerPrice && item.quantity) {
            let offerTotal = calculate.multiply(item['quantity'], item['offerPrice']);
            subOfferTotal = calculate.add(subOfferTotal, offerTotal);
          }
          if (item.quantity && item.price) {
            let total = calculate.multiply(item['quantity'], item['price']);
            //sub total
            subTotal = calculate.add(subTotal, total);
          }
        }
      });
      setSubTotal(subTotal);
      setOfferSubTotal(subOfferTotal);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(erp.resetAction({ actionType: 'create' }));
      setSubTotal(0);
      setOfferSubTotal(0);
      navigate(`/${entity.toLowerCase()}/read/${result._id}`);
    }
    return () => {};
  }, [isSuccess]);

  // Helper function to convert dayjs objects to ISO strings recursively
  const convertDayjsToISO = (obj) => {
    if (obj === null || obj === undefined) {
      return obj;
    }
    
    // Check if it's a dayjs object (has $d property and format method)
    if (obj && typeof obj === 'object' && '$d' in obj && typeof obj.format === 'function') {
      try {
        // Try toISOString first (if available)
        if (typeof obj.toISOString === 'function') {
          return obj.toISOString();
        }
        // Otherwise use $d property
        if (obj.$d) {
          return new Date(obj.$d).toISOString();
        }
        // Fallback: use dayjs format
        return obj.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
      } catch (e) {
        console.error('Error converting dayjs to ISO:', e);
        return obj;
      }
    }
    
    // Handle arrays
    if (Array.isArray(obj)) {
      return obj.map(item => convertDayjsToISO(item));
    }
    
    // Handle objects (but not Date objects or other special objects)
    if (typeof obj === 'object' && obj.constructor === Object) {
      const converted = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          converted[key] = convertDayjsToISO(obj[key]);
        }
      }
      return converted;
    }
    
    return obj;
  };

  const onSubmit = (fieldsValue) => {
    console.log('🚀 ~ onSubmit ~ fieldsValue:', fieldsValue);
    if (fieldsValue) {
      // For booking entity, convert all dayjs objects to ISO strings
      if (entity === 'booking') {
        fieldsValue = convertDayjsToISO(fieldsValue);
        console.log('✅ Converted booking dates:', fieldsValue);
      }
      
      // For Role entity, build complete permissions object from switches
      if (entity === 'role') {
        const PERMISSION_KEYS = [
          'dashboard',
          'customers',
          'suppliers',
          'invoices',
          'quotes',
          'payments',
          'expenses',
          'packages',
          'visaPackages',
          'hotelBookings',
          'accounts',
          'journalEntries',
          'bankAccounts',
          'financialYear',
          'ledgerPostingRules',
          'employees',
          'attendance',
          'payroll',
          'commission',
          'company',
          'branches',
          'reports',
          'financialReports',
          'businessReports',
          'documents',
          'settings',
          'roles',
          'users',
          'loginHistory',
          'canCreate',
          'canUpdate',
          'canDelete',
          'canView',
          'canExport',
          'canApprove',
        ];

        const formPermissions = fieldsValue.permissions || {};
        const normalizedPermissions = {};

        // Build complete permissions object - explicitly check each key
        PERMISSION_KEYS.forEach((key) => {
          // If form has this permission explicitly set (true/false), use it
          // Otherwise default to false
          normalizedPermissions[key] = formPermissions[key] === true;
        });

        console.log('🔧 Role Create - Form Permissions:', formPermissions);
        console.log('🔧 Role Create - Normalized Permissions:', normalizedPermissions);

        const payload = {
          roleCode: fieldsValue.roleCode,
          roleName: fieldsValue.roleName,
          description: fieldsValue.description,
          enabled: fieldsValue.enabled !== undefined ? fieldsValue.enabled : true,
          permissions: normalizedPermissions,
        };

        console.log('🔧 Role Create - Final Payload:', payload);

        dispatch(erp.create({ entity, jsonData: payload }));
        return;
      }
      
      if (fieldsValue.items) {
        let newList = [...fieldsValue.items];
        // Filter out invalid items
        newList = newList.filter(item => 
          item && 
          item.itemName && 
          item.itemName.trim() !== '' && 
          item.price !== undefined && 
          item.price !== null &&
          !isNaN(item.price) &&
          item.price >= 0
        );
        
        // Calculate totals for valid items
        newList.forEach((item) => {
          const quantity = item.quantity || 1;
          item.total = calculate.multiply(quantity, item.price);
        });
        
        fieldsValue = {
          ...fieldsValue,
          items: newList,
        };
      } else {
        // Ensure items is an array even if empty
        fieldsValue.items = [];
      }
      
    }
    console.log('🚀 ~ Final fieldsValue:', fieldsValue);
    dispatch(erp.create({ entity, jsonData: fieldsValue }));
  };

  return (
    <>
      <PageHeader
        onBack={() => {
          navigate(`/${entity.toLowerCase()}`);
        }}
        backIcon={<ArrowLeftOutlined />}
        title={translate('New')}
        ghost={false}
        tags={<Tag>{translate('Draft')}</Tag>}
        // subTitle="This is create page"
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => navigate(`/${entity.toLowerCase()}`)}
            icon={<CloseCircleOutlined />}
          >
            {translate('Cancel')}
          </Button>,
          <SaveForm form={form} key={`${uniqueId()}`} />,
        ]}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>
      <Divider dashed />
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical" onFinish={onSubmit} onValuesChange={handelValuesChange}>
          <CreateForm subTotal={subTotal} offerTotal={offerSubTotal} />
        </Form>
      </Loading>
    </>
  );
}
