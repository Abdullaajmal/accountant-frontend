import { useState } from 'react';
import { Modal, Form, Input, InputNumber, Button, message, Row, Col, Select } from 'antd';
import { request } from '@/request';
import useLanguage from '@/locale/useLanguage';

/**
 * Inline Supplier Creation Modal
 * Opens a modal to create supplier without redirecting to another page
 */
export default function InlineSupplierModal({ visible, onCancel, onSuccess }) {
  const translate = useLanguage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await request.create({
        entity: 'supplier',
        jsonData: values,
      });

      if (response.success) {
        message.success(translate('Supplier created successfully'));
        form.resetFields();
        onSuccess?.(response.result); // Pass the created supplier to parent
        onCancel();
      } else {
        message.error(response.message || translate('Failed to create supplier'));
      }
    } catch (error) {
      console.error('Error creating supplier:', error);
      message.error(translate('Error creating supplier'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={translate('Add New Supplier')}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Row gutter={[12, 0]}>
          <Col span={8}>
            <Form.Item
              name="supplierCode"
              label={translate('Supplier Code')}
              rules={[{ required: true, message: translate('Please enter supplier code') }]}
            >
              <Input placeholder={translate('Supplier Code')} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="name"
              label={translate('Supplier Name')}
              rules={[{ required: true, message: translate('Please enter supplier name') }]}
            >
              <Input placeholder={translate('Supplier Name')} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="supplierType"
              label={translate('Supplier Type')}
              initialValue={'other'}
            >
              <Select
                options={[
                  { value: 'hotel', label: translate('Hotel') },
                  { value: 'airline', label: translate('Airline') },
                  { value: 'transport', label: translate('Transport') },
                  { value: 'tour_operator', label: translate('Tour Operator') },
                  { value: 'other', label: translate('Other') },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12, 0]}>
          <Col span={8}>
            <Form.Item
              name="contactPerson"
              label={translate('Contact Person')}
            >
              <Input placeholder={translate('Contact Person')} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="phone"
              label={translate('Phone')}
            >
              <Input placeholder={translate('Phone')} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="email"
              label={translate('Email')}
              rules={[
                { type: 'email', message: translate('Please enter a valid email') },
              ]}
            >
              <Input placeholder={translate('Email')} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12, 0]}>
          <Col span={12}>
            <Form.Item
              name="address"
              label={translate('Address')}
            >
              <Input.TextArea rows={2} placeholder={translate('Address')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="commissionRate"
              label={translate('Commission Rate (%)')}
              initialValue={0}
            >
              <InputNumber
                min={0}
                max={100}
                style={{ width: '100%' }}
                placeholder={translate('Commission Rate')}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button onClick={onCancel}>
              {translate('Cancel')}
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {translate('Save')}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
