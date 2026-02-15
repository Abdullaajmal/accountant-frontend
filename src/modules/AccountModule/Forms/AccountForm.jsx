import { Form, Input, Select, Row, Col, InputNumber } from 'antd';
import useLanguage from '@/locale/useLanguage';
import SelectAsync from '@/components/SelectAsync';

export default function AccountForm({ current = null }) {
  const translate = useLanguage();

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="accountCode"
            label={translate('Account Code')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder={translate('Account Code')} />
          </Form.Item>
        </Col>
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
            name="accountType"
            label={translate('Account Type')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              options={[
                { value: 'Asset', label: translate('Asset') },
                { value: 'Liability', label: translate('Liability') },
                { value: 'Equity', label: translate('Equity') },
                { value: 'Income', label: translate('Income') },
                { value: 'Expense', label: translate('Expense') },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item name="parentAccount" label={translate('Parent Account')}>
            <SelectAsync
              entity={'account'}
              displayLabels={['accountName']}
              searchFields={'accountName'}
              withRedirect={false}
              placeholder={translate('Select Parent Account (Optional)')}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item name="openingBalance" label={translate('Opening Balance')} initialValue={0}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item name="isParent" label={translate('Is Parent Account')} initialValue={false} valuePropName="checked">
            <Select
              options={[
                { value: false, label: translate('No') },
                { value: true, label: translate('Yes') },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={24}>
          <Form.Item name="description" label={translate('Description')}>
            <Input.TextArea rows={3} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
