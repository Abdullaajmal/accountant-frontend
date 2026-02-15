import { Form, Input, Row, Col, DatePicker, Select } from 'antd';
import useLanguage from '@/locale/useLanguage';
import SelectAsync from '@/components/SelectAsync';
import dayjs from 'dayjs';

export default function FinancialYearForm({ current = null }) {
  const translate = useLanguage();

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="company"
            label={translate('Company')}
            rules={[{ required: true }]}
          >
            <SelectAsync entity="company" displayLabels={['companyName']} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="yearName"
            label={translate('Year Name')}
            rules={[{ required: true }]}
          >
            <Input placeholder={translate('Year Name')} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="startDate"
            label={translate('Start Date')}
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="endDate"
            label={translate('End Date')}
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item 
            name="status" 
            label={translate('Status')}
            initialValue="open"
          >
            <Select>
              <Select.Option value="open">{translate('Open')}</Select.Option>
              <Select.Option value="draft">{translate('Draft')}</Select.Option>
              <Select.Option value="closed">{translate('Closed')}</Select.Option>
              <Select.Option value="locked">{translate('Locked')}</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name="notes" label={translate('Notes')}>
            <Input.TextArea rows={4} placeholder={translate('Notes')} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
