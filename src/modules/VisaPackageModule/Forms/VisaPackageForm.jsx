import { Form, Input, Select, Row, Col, InputNumber } from 'antd';
import useLanguage from '@/locale/useLanguage';
import SelectAsync from '@/components/SelectAsync';

export default function VisaPackageForm({ current = null }) {
  const translate = useLanguage();

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="packageCode"
            label={translate('Package Code')}
            rules={[{ required: true }]}
          >
            <Input placeholder={translate('Package Code')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="packageName"
            label={translate('Package Name')}
            rules={[{ required: true }]}
          >
            <Input placeholder={translate('Package Name')} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item name={['destination', 'country']} label={translate('Country')}>
            <Input placeholder={translate('Country')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name={['destination', 'city']} label={translate('City')}>
            <Input placeholder={translate('City')} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="visaType"
            label={translate('Visa Type')}
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: 'tourist', label: translate('Tourist') },
                { value: 'business', label: translate('Business') },
                { value: 'transit', label: translate('Transit') },
                { value: 'student', label: translate('Student') },
                { value: 'work', label: translate('Work') },
                { value: 'other', label: translate('Other') },
              ]}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name="supplier" label={translate('Supplier')}>
            <SelectAsync entity="supplier" displayLabels={['name']} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={8}>
          <Form.Item name={['cost', 'basePrice']} label={translate('Base Price')}>
            <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item name={['cost', 'serviceCharge']} label={translate('Service Charge')}>
            <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item name="supplierCost" label={translate('Supplier Cost')}>
            <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item name="validity" label={translate('Validity (Days)')}>
            <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name="processingTime" label={translate('Processing Time (Days)')}>
            <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
