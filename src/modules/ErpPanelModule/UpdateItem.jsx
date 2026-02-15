import { useState, useEffect } from 'react';
import { Form, Divider } from 'antd';
import dayjs from 'dayjs';
import { Button, Tag } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';

import { useSelector, useDispatch } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import { erp } from '@/redux/erp/actions';

import calculate from '@/utils/calculate';
import { generate as uniqueId } from 'shortid';
import { selectUpdatedItem } from '@/redux/erp/selectors';
import Loading from '@/components/Loading';

import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

import { settingsAction } from '@/redux/settings/actions';
// import { StatusTag } from '@/components/Tag';

function SaveForm({ form, translate }) {
  const handelClick = () => {
    form.submit();
  };

  return (
    <Button onClick={handelClick} type="primary" icon={<PlusOutlined />}>
      {translate('update')}
    </Button>
  );
}

export default function UpdateItem({ config, UpdateForm }) {
  const translate = useLanguage();
  let { entity } = config;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { current, isLoading, isSuccess } = useSelector(selectUpdatedItem);
  const [form] = Form.useForm();
  const [subTotal, setSubTotal] = useState(0);

  const resetErp = {
    status: '',
    client: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
    subTotal: 0,
    taxTotal: 0,
    taxRate: 0,
    total: 0,
    credit: 0,
    number: 0,
    year: 0,
  };

  const [currentErp, setCurrentErp] = useState(current ?? resetErp);

  const { id } = useParams();

  const handelValuesChange = (changedValues, values) => {
    const items = values['items'];
    let subTotal = 0;

    if (items) {
      items.map((item) => {
        if (item) {
          if (item.quantity && item.price) {
            let total = calculate.multiply(item['quantity'], item['price']);
            //sub total
            subTotal = calculate.add(subTotal, total);
          }
        }
      });
      setSubTotal(subTotal);
    }
  };

  const onSubmit = (fieldsValue) => {
    // For Role entity, build a complete permissions object from switches.
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

      const { _id, ...restFields } = fieldsValue || {};

      // Get permissions from form - Ant Design Switch sends true/false or undefined
      const formPermissions = restFields.permissions || {};
      
      // Build complete permissions object - explicitly check each key
      const normalizedPermissions = {};
      PERMISSION_KEYS.forEach((key) => {
        // If form has this permission explicitly set (true/false), use it
        // Otherwise default to false
        normalizedPermissions[key] = formPermissions[key] === true;
      });

      console.log('🔧 Role Update - Form Permissions:', formPermissions);
      console.log('🔧 Role Update - Normalized Permissions:', normalizedPermissions);

      const dataToUpdate = {
        roleCode: restFields.roleCode,
        roleName: restFields.roleName,
        description: restFields.description,
        enabled: restFields.enabled !== undefined ? restFields.enabled : true,
        permissions: normalizedPermissions,
      };

      console.log('🔧 Role Update - Final Payload:', dataToUpdate);

      dispatch(erp.update({ entity, id, jsonData: dataToUpdate }));
      return;
    }

    let dataToUpdate = { ...fieldsValue };
    if (fieldsValue) {
      if (fieldsValue.date || fieldsValue.expiredDate) {
        dataToUpdate.date = dayjs(fieldsValue.date).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        dataToUpdate.expiredDate = dayjs(fieldsValue.expiredDate).format(
          'YYYY-MM-DDTHH:mm:ss.SSSZ'
        );
      }
      if (fieldsValue.items) {
        let newList = [];
        fieldsValue.items.map((item) => {
          const { quantity, price, itemName, description } = item;
          const total = item.quantity * item.price;
          newList.push({ total, quantity, price, itemName, description });
        });
        dataToUpdate.items = newList;
      }
    }

    dispatch(erp.update({ entity, id, jsonData: dataToUpdate }));
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      setSubTotal(0);
      dispatch(erp.resetAction({ actionType: 'update' }));
      navigate(`/${entity.toLowerCase()}/read/${id}`);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (current) {
      setCurrentErp(current);
      let formData = { ...current };
      if (formData.date) {
        formData.date = dayjs(formData.date);
      }
      if (formData.expiredDate) {
        formData.expiredDate = dayjs(formData.expiredDate);
      }
      if (!formData.taxRate) {
        formData.taxRate = 0;
      }

      // For Role entity: Ensure permissions object is properly structured
      if (entity === 'role' && formData.permissions) {
        // Ensure all permission fields are explicitly boolean
        const permissions = formData.permissions;
        formData.permissions = {
          dashboard: permissions.dashboard === true,
          customers: permissions.customers === true,
          suppliers: permissions.suppliers === true,
          invoices: permissions.invoices === true,
          quotes: permissions.quotes === true,
          payments: permissions.payments === true,
          expenses: permissions.expenses === true,
          packages: permissions.packages === true,
          visaPackages: permissions.visaPackages === true,
          hotelBookings: permissions.hotelBookings === true,
          accounts: permissions.accounts === true,
          journalEntries: permissions.journalEntries === true,
          bankAccounts: permissions.bankAccounts === true,
          financialYear: permissions.financialYear === true,
          ledgerPostingRules: permissions.ledgerPostingRules === true,
          employees: permissions.employees === true,
          attendance: permissions.attendance === true,
          payroll: permissions.payroll === true,
          commission: permissions.commission === true,
          company: permissions.company === true,
          branches: permissions.branches === true,
          reports: permissions.reports === true,
          financialReports: permissions.financialReports === true,
          businessReports: permissions.businessReports === true,
          documents: permissions.documents === true,
          settings: permissions.settings === true,
          roles: permissions.roles === true,
          users: permissions.users === true,
          loginHistory: permissions.loginHistory === true,
          canCreate: permissions.canCreate === true,
          canUpdate: permissions.canUpdate === true,
          canDelete: permissions.canDelete === true,
          canView: permissions.canView === true,
          canExport: permissions.canExport === true,
          canApprove: permissions.canApprove === true,
        };
      } else if (entity === 'role' && !formData.permissions) {
        // If no permissions object exists, initialize with all false
        formData.permissions = {
          dashboard: false,
          customers: false,
          suppliers: false,
          invoices: false,
          quotes: false,
          payments: false,
          expenses: false,
          packages: false,
          visaPackages: false,
          hotelBookings: false,
          accounts: false,
          journalEntries: false,
          bankAccounts: false,
          financialYear: false,
          ledgerPostingRules: false,
          employees: false,
          attendance: false,
          payroll: false,
          commission: false,
          company: false,
          branches: false,
          reports: false,
          financialReports: false,
          businessReports: false,
          documents: false,
          settings: false,
          roles: false,
          users: false,
          loginHistory: false,
          canCreate: false,
          canUpdate: false,
          canDelete: false,
          canView: false,
          canExport: false,
          canApprove: false,
        };
      }

      const { subTotal } = formData;

      form.resetFields();
      form.setFieldsValue(formData);
      setSubTotal(subTotal);
      
      // For Role entity, ensure permissions switches reflect the loaded values
      if (entity === 'role' && formData.permissions) {
        // Force form to update permissions switches
        const permissions = formData.permissions;
        Object.keys(permissions).forEach((key) => {
          form.setFieldValue(['permissions', key], permissions[key] === true);
        });
      }
    }
  }, [current, entity, form]);

  return (
    <>
      <PageHeader
        onBack={() => {
          navigate(`/${entity.toLowerCase()}`);
        }}
        title={translate('update')}
        ghost={false}
        tags={[
          <span key="status">{currentErp.status && translate(currentErp.status)}</span>,
          currentErp.paymentStatus && (
            <span key="paymentStatus">
              {currentErp.paymentStatus && translate(currentErp.paymentStatus)}
            </span>
          ),
        ]}
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              navigate(`/${entity.toLowerCase()}`);
            }}
            icon={<CloseCircleOutlined />}
          >
            {translate('Cancel')}
          </Button>,
          <SaveForm translate={translate} form={form} key={`${uniqueId()}`} />,
        ]}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>
      <Divider dashed />
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical" onFinish={onSubmit} onValuesChange={handelValuesChange}>
          <UpdateForm subTotal={subTotal} current={current} />
        </Form>
      </Loading>
    </>
  );
}
