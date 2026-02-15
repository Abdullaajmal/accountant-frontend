import { Form, Input, InputNumber, Select, Row, Col } from 'antd';
import useLanguage from '@/locale/useLanguage';

export default function SupplierForm({ current = null }) {
  const translate = useLanguage();

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="supplierCode"
            label={translate('Supplier Code')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder={translate('Supplier Code')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="name"
            label={translate('Supplier Name')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder={translate('Supplier Name')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
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
        <Col className="gutter-row" span={8}>
          <Form.Item name="contactPerson" label={translate('Contact Person')}>
            <Input placeholder={translate('Contact Person')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item name="phone" label={translate('Phone')}>
            <Input placeholder={translate('Phone')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item name="email" label={translate('Email')}>
            <Input type="email" placeholder={translate('Email')} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item name="address" label={translate('Address')}>
            <Input.TextArea rows={2} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name="country" label={translate('Country')}>
            <Input placeholder={translate('Country')} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={8}>
          <Form.Item name="website" label={translate('Website')}>
            <Input placeholder={translate('Website URL')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item name="taxNumber" label={translate('Tax Number')}>
            <Input placeholder={translate('Tax Number')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item name="commissionRate" label={translate('Commission Rate (%)')} initialValue={0}>
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item name="paymentTerms" label={translate('Payment Terms')}>
            <Input.TextArea rows={2} placeholder={translate('Payment Terms')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name="notes" label={translate('Notes')}>
            <Input.TextArea rows={2} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item name="bankName" label={translate('Bank Name')}>
            <Input placeholder={translate('Bank Name')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name="accountNumber" label={translate('Account Number')}>
            <Input placeholder={translate('Account Number')} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
