import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber } from 'antd';
import { DatePicker } from 'antd';
import SelectAsync from '@/components/SelectAsync';
import { useMoney, useDate } from '@/settings';
import { request } from '@/request';
import useLanguage from '@/locale/useLanguage';

export default function PaymentForm({ maxAmount = null, isUpdateForm = false, currentItem = null }) {
  const translate = useLanguage();
  const { TextArea } = Input;
  const money = useMoney();
  const { dateFormat } = useDate();
  const [form] = Form.useForm();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoiceMaxAmount, setInvoiceMaxAmount] = useState(maxAmount);

  // When invoice is selected, fetch invoice details and auto-populate client
  const handleInvoiceChange = async (invoiceId) => {
    if (invoiceId) {
      try {
        const response = await request.read({ entity: 'invoice', id: invoiceId });
        if (response.success && response.result) {
          const invoice = response.result;
          setSelectedInvoice(invoice);
          
          // Calculate max amount
          const { total, discount, credit } = invoice;
          const max = total - discount - credit;
          setInvoiceMaxAmount(max);
          
          // Auto-populate client
          if (invoice.client && invoice.client._id) {
            form.setFieldsValue({ client: invoice.client._id });
          }
          
          // Set currency from invoice
          if (invoice.currency) {
            form.setFieldsValue({ currency: invoice.currency });
          }
        }
      } catch (error) {
        console.error('Error fetching invoice:', error);
      }
    } else {
      setSelectedInvoice(null);
      setInvoiceMaxAmount(maxAmount);
      form.setFieldsValue({ client: undefined });
    }
  };

  // For update form, set initial values
  useEffect(() => {
    if (isUpdateForm && currentItem) {
      if (currentItem.invoice && typeof currentItem.invoice === 'object') {
        setSelectedInvoice(currentItem.invoice);
        const { total, discount, credit } = currentItem.invoice;
        const max = total - discount - credit;
        setInvoiceMaxAmount(max);
      }
    }
  }, [isUpdateForm, currentItem]);

  return (
    <>
      {!isUpdateForm && (
        <>
          <Form.Item
            label={translate('Invoice')}
            name="invoice"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <SelectAsync
              entity={'invoice'}
              displayLabels={['number', 'year']}
              searchFields={'number'}
              withRedirect={true}
              urlToRedirect="/invoice"
              redirectLabel="Add New Invoice"
              placeholder={translate('Select Invoice (Number/Year)')}
              onChange={handleInvoiceChange}
            />
          </Form.Item>
          <Form.Item
            label={translate('Client')}
            name="client"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <SelectAsync
              entity={'client'}
              displayLabels={['name']}
              searchFields={'name'}
              withRedirect={true}
              urlToRedirect="/customer"
              redirectLabel="Add New Client"
              placeholder={translate('Select Client')}
            />
          </Form.Item>
        </>
      )}
      <Form.Item
        label={translate('number')}
        name="number"
        initialValue={1}
        rules={[
          {
            required: true,
          },
        ]}
        style={{ width: '50%', float: 'left', paddingRight: '20px' }}
      >
        <InputNumber min={1} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name="date"
        label={translate('date')}
        rules={[
          {
            required: true,
            type: 'object',
          },
        ]}
        initialValue={dayjs()}
        style={{ width: '100%' }}
      >
        <DatePicker format={dateFormat} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item 
        label={translate('amount')} 
        name="amount" 
        rules={[{ required: true }]}
      >
        <InputNumber
          className="moneyInput"
          min={0}
          controls={false}
          max={invoiceMaxAmount || maxAmount}
          addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
          addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
        />
      </Form.Item>
      <Form.Item
        label={translate('payment Mode')}
        name="paymentMode"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <SelectAsync
          entity={'paymentMode'}
          displayLabels={['name']}
          withRedirect={true}
          urlToRedirect="/payment/mode"
          redirectLabel="Add Payment Mode"
        />
      </Form.Item>
      <Form.Item label={translate('Reference')} name="ref">
        <Input />
      </Form.Item>
      <Form.Item label={translate('Description')} name="description">
        <TextArea />
      </Form.Item>
    </>
  );
}
