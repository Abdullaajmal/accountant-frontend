import { Form, Input, Select, Row, Col, InputNumber, DatePicker } from 'antd';
import useLanguage from '@/locale/useLanguage';
import SelectAsync from '@/components/SelectAsync';
import dayjs from 'dayjs';

export default function EmployeeForm({ current = null }) {
  const translate = useLanguage();

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="firstName"
            label={translate('First Name')}
            rules={[{ required: true }]}
          >
            <Input placeholder={translate('First Name')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="lastName"
            label={translate('Last Name')}
            rules={[{ required: true }]}
          >
            <Input placeholder={translate('Last Name')} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item name="email" label={translate('Email')}>
            <Input type="email" placeholder={translate('Email')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name="phone" label={translate('Phone')}>
            <Input placeholder={translate('Phone')} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item name="company" label={translate('Company')}>
            <SelectAsync entity="company" displayLabels={['companyName']} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name="branch" label={translate('Branch')}>
            <SelectAsync entity="branch" displayLabels={['branchName']} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="dateOfJoining"
            label={translate('Date of Joining')}
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name="dateOfBirth" label={translate('Date of Birth')}>
            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item name="designation" label={translate('Designation')}>
            <Input placeholder={translate('Designation')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name="department" label={translate('Department')}>
            <Input placeholder={translate('Department')} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item name="employeeType" label={translate('Employee Type')}>
            <Select
              options={[
                { value: 'full-time', label: translate('Full Time') },
                { value: 'part-time', label: translate('Part Time') },
                { value: 'contract', label: translate('Contract') },
                { value: 'intern', label: translate('Intern') },
                { value: 'agent', label: translate('Agent') },
              ]}
              defaultValue="full-time"
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name="status" label={translate('Status')}>
            <Select
              options={[
                { value: 'active', label: translate('Active') },
                { value: 'inactive', label: translate('Inactive') },
                { value: 'terminated', label: translate('Terminated') },
                { value: 'on-leave', label: translate('On Leave') },
              ]}
              defaultValue="active"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={8}>
          <Form.Item name={['salary', 'basic']} label={translate('Basic Salary')}>
            <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item name={['salary', 'allowances']} label={translate('Allowances')}>
            <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item name={['salary', 'deductions']} label={translate('Deductions')}>
            <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item name={['commission', 'type']} label={translate('Commission Type')}>
            <Select
              options={[
                { value: 'percentage', label: translate('Percentage') },
                { value: 'fixed', label: translate('Fixed') },
                { value: 'tiered', label: translate('Tiered') },
              ]}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name={['commission', 'rate']} label={translate('Commission Rate')}>
            <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
