import { Form, Input, Select, Row, Col, InputNumber } from 'antd';
import useLanguage from '@/locale/useLanguage';
import dayjs from 'dayjs';

export default function CompanyForm({ current = null }) {
  const translate = useLanguage();

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="companyCode"
            label={translate('Company Code')}
            rules={[{ required: true }]}
          >
            <Input placeholder={translate('Company Code')} style={{ textTransform: 'uppercase' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="companyName"
            label={translate('Company Name')}
            rules={[{ required: true }]}
          >
            <Input placeholder={translate('Company Name')} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item name="legalName" label={translate('Legal Name')}>
            <Input placeholder={translate('Legal Name')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name="registrationNumber" label={translate('Registration Number')}>
            <Input placeholder={translate('Registration Number')} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item name="taxId" label={translate('Tax ID')}>
            <Input placeholder={translate('Tax ID')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name="gstNumber" label={translate('GST Number')}>
            <Input placeholder={translate('GST Number')} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item name="currency" label={translate('Currency')}>
            <Select
              options={[
                { value: 'USD', label: 'USD' },
                { value: 'PKR', label: 'PKR' },
                { value: 'EUR', label: 'EUR' },
                { value: 'GBP', label: 'GBP' },
              ]}
              defaultValue="USD"
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name="timezone" label={translate('Timezone')}>
            <Select
              options={[
                { value: 'UTC', label: 'UTC' },
                { value: 'Asia/Karachi', label: 'Asia/Karachi (PKT)' },
                { value: 'America/New_York', label: 'America/New_York (EST)' },
              ]}
              defaultValue="UTC"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item name={['address', 'street']} label={translate('Street')}>
            <Input placeholder={translate('Street')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name={['address', 'city']} label={translate('City')}>
            <Input placeholder={translate('City')} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item name={['address', 'state']} label={translate('State')}>
            <Input placeholder={translate('State')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name={['address', 'country']} label={translate('Country')}>
            <Input placeholder={translate('Country')} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item name={['contact', 'phone']} label={translate('Phone')}>
            <Input placeholder={translate('Phone')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name={['contact', 'email']} label={translate('Email')}>
            <Input type="email" placeholder={translate('Email')} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item name={['fiscalYearStart', 'month']} label={translate('Fiscal Year Start Month')}>
            <Select
              options={[
                { value: 1, label: translate('January') },
                { value: 2, label: translate('February') },
                { value: 3, label: translate('March') },
                { value: 4, label: translate('April') },
                { value: 5, label: translate('May') },
                { value: 6, label: translate('June') },
                { value: 7, label: translate('July') },
                { value: 8, label: translate('August') },
                { value: 9, label: translate('September') },
                { value: 10, label: translate('October') },
                { value: 11, label: translate('November') },
                { value: 12, label: translate('December') },
              ]}
              defaultValue={1}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name="isActive" label={translate('Status')} valuePropName="checked">
            <Select
              options={[
                { value: true, label: translate('Active') },
                { value: false, label: translate('Inactive') },
              ]}
              defaultValue={true}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
