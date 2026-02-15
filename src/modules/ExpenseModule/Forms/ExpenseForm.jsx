import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Select, Row, Col, DatePicker } from 'antd';
import { useDate } from '@/settings';
import useLanguage from '@/locale/useLanguage';
import SelectAsync from '@/components/SelectAsync';

export default function ExpenseForm({ current = null }) {
  const translate = useLanguage();
  const { dateFormat } = useDate();

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="expenseNumber"
            label={translate('Expense Number')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder={translate('Expense Number')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="date"
            label={translate('Date')}
            rules={[
              {
                required: true,
                type: 'object',
              },
            ]}
            initialValue={dayjs()}
          >
            <DatePicker style={{ width: '100%' }} format={dateFormat} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="expenseCategory"
            label={translate('Category')}
            initialValue={'other'}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              options={[
                { value: 'marketing', label: translate('Marketing') },
                { value: 'office', label: translate('Office') },
                { value: 'travel', label: translate('Travel') },
                { value: 'supplier_payment', label: translate('Supplier Payment') },
                { value: 'utilities', label: translate('Utilities') },
                { value: 'salary', label: translate('Salary') },
                { value: 'commission', label: translate('Commission') },
                { value: 'other', label: translate('Other') },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="description"
            label={translate('Description')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea rows={2} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item
            name="amount"
            label={translate('Amount')}
            rules={[
              {
                required: true,
              },
            ]}
            initialValue={0}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item name="currency" label={translate('Currency')} initialValue={'USD'}>
            <Select
              options={[
                { value: 'USD', label: 'USD' },
                { value: 'EUR', label: 'EUR' },
                { value: 'GBP', label: 'GBP' },
                { value: 'PKR', label: 'PKR' },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={8}>
          <Form.Item name="account" label={translate('Account')}>
            <SelectAsync
              entity={'account'}
              displayLabels={['accountName']}
              searchFields={'accountName'}
              withRedirect={true}
              urlToRedirect="/account"
              redirectLabel={translate('Add New Account')}
              placeholder={translate('Select Account')}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item name="supplier" label={translate('Supplier')}>
            <SelectAsync
              entity={'supplier'}
              displayLabels={['name']}
              searchFields={'name'}
              withRedirect={true}
              urlToRedirect="/supplier"
              redirectLabel={translate('Add New Supplier')}
              placeholder={translate('Select Supplier')}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item name="paymentMode" label={translate('Payment Mode')}>
            <SelectAsync
              entity={'paymentmode'}
              displayLabels={['name']}
              searchFields={'name'}
              withRedirect={true}
              urlToRedirect="/payment/mode"
              redirectLabel={translate('Add New Payment Mode')}
              placeholder={translate('Select Payment Mode')}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item name="invoice" label={translate('Invoice Number')}>
            <Input placeholder={translate('Invoice Number')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name="receipt" label={translate('Receipt Number')}>
            <Input placeholder={translate('Receipt Number')} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={24}>
          <Form.Item name="notes" label={translate('Notes')}>
            <Input.TextArea rows={2} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
