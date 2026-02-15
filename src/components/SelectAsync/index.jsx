import { useState, useEffect } from 'react';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import { Select, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { generate as uniqueId } from 'shortid';
import color from '@/utils/color';
import useLanguage from '@/locale/useLanguage';
import InlineSupplierModal from '@/components/InlineSupplierModal';

const SelectAsync = ({
  entity,
  displayLabels = ['name'],
  outputValue = '_id',
  redirectLabel = '',
  withRedirect = false,
  urlToRedirect = '/',
  withInlineModal = false, // New prop for inline modal instead of redirect
  placeholder = 'select',
  value,
  onChange,
}) => {
  const translate = useLanguage();
  const [selectOptions, setOptions] = useState([]);
  const [currentValue, setCurrentValue] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);

  const navigate = useNavigate();

  const asyncList = () => {
    // Special handling for role entity - use public endpoint
    if (entity === 'role') {
      return request.get({ entity: 'roles/public' });
    }
    return request.list({ entity });
  };
  const { result, isLoading: fetchIsLoading, isSuccess } = useFetch(asyncList);
  useEffect(() => {
    if (isSuccess && result) {
      // Ensure result is an array
      const optionsArray = Array.isArray(result) ? result : (result.result || []);
      setOptions(optionsArray);
    } else if (!fetchIsLoading && !isSuccess) {
      // Set empty array if fetch failed
      setOptions([]);
    }
  }, [isSuccess, result, fetchIsLoading]);

  const labels = (optionField) => {
    return displayLabels.map((x) => optionField[x]).join(' ');
  };
  useEffect(() => {
    if (value !== undefined) {
      const val = value?.[outputValue] ?? value;
      setCurrentValue(val);
      onChange(val);
    }
  }, [value]);

  const handleSelectChange = (newValue) => {
    if (newValue === 'redirectURL') {
      if (withInlineModal && entity === 'supplier') {
        // Open inline modal instead of redirecting
        setModalVisible(true);
      } else {
        // Default behavior: redirect
        navigate(urlToRedirect);
      }
    } else {
      const val = newValue?.[outputValue] ?? newValue;
      setCurrentValue(newValue);
      onChange(val);
    }
  };

  const handleSupplierCreated = (newSupplier) => {
    // Refresh the options list
    const asyncList = async () => {
      return await request.list({ entity });
    };
    // Add the new supplier to options immediately
    if (newSupplier) {
      setOptions((prev) => [...prev, newSupplier]);
      // Set the newly created supplier as selected
      const val = newSupplier[outputValue] ?? newSupplier;
      setCurrentValue(val);
      onChange(val);
    }
    setModalVisible(false);
  };

  const optionsList = () => {
    const list = [];

    // if (selectOptions.length === 0 && withRedirect) {
    //   const value = 'redirectURL';
    //   const label = `+ ${translate(redirectLabel)}`;
    //   list.push({ value, label });
    // }
    if (selectOptions && Array.isArray(selectOptions)) {
      selectOptions.map((optionField) => {
        const value = optionField[outputValue] ?? optionField;
        const label = labels(optionField);
        const currentColor = optionField[outputValue]?.color ?? optionField?.color;
        const labelColor = color.find((x) => x.color === currentColor);
        list.push({ value, label, color: labelColor?.color });
      });
    }

    return list;
  };

  return (
    <>
      <Select
        loading={fetchIsLoading}
        disabled={fetchIsLoading}
        value={currentValue}
        onChange={handleSelectChange}
        placeholder={placeholder}
        showSearch
        filterOption={(input, option) => {
          // Get the label from the option's data attribute or children
          const label = option?.label || option?.children?.props?.children || '';
          return String(label).toLowerCase().includes(input.toLowerCase());
        }}
        optionFilterProp="label"
      >
        {(() => {
          const options = optionsList();
          return options && Array.isArray(options) ? options.map((option) => {
            return (
              <Select.Option 
                key={`${uniqueId()}`} 
                value={option.value}
                label={option.label}
              >
                <Tag bordered={false} color={option.color}>
                  {option.label}
                </Tag>
              </Select.Option>
            );
          }) : null;
        })()}
        {withRedirect && (
          <Select.Option value={'redirectURL'}>{`+ ` + translate(redirectLabel)}</Select.Option>
        )}
      </Select>
      {withInlineModal && entity === 'supplier' && (
        <InlineSupplierModal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onSuccess={handleSupplierCreated}
        />
      )}
    </>
  );
};

export default SelectAsync;
