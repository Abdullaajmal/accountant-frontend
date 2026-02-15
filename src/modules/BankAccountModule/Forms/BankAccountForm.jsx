import { Form, Input, InputNumber, Select, Row, Col, Switch } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { currencyOptions } from '@/utils/currencyList';

export default function BankAccountForm({ current = null }) {
  const translate = useLanguage();

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="accountName"
            label={translate('Account Name')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder={translate('Account Name')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="accountNumber"
            label={translate('Account Number')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder={translate('Account Number')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="bankName"
            label={translate('Bank Name')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder={translate('Bank Name')} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={8}>
          <Form.Item name="branch" label={translate('Branch')}>
            <Input placeholder={translate('Branch')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item name="ifscCode" label={translate('IFSC Code')}>
            <Input placeholder={translate('IFSC Code')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item name="swiftCode" label={translate('SWIFT Code')}>
            <Input placeholder={translate('SWIFT Code')} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="accountType"
            label={translate('Account Type')}
            initialValue={'Current'}
          >
            <Select
              options={[
                { value: 'Current', label: translate('Current') },
                { value: 'Savings', label: translate('Savings') },
                { value: 'Fixed Deposit', label: translate('Fixed Deposit') },
                { value: 'Other', label: translate('Other') },
              ]}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="currency"
            label={translate('Currency')}
            initialValue={'USD'}
          >
            <Select
              options={currencyOptions()}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item name="openingBalance" label={translate('Opening Balance')} initialValue={0}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item name="description" label={translate('Description')}>
            <Input.TextArea rows={2} placeholder={translate('Description')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name="isDefault" label={translate('Set as Default')} valuePropName="checked" initialValue={false}>
            <Switch />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
