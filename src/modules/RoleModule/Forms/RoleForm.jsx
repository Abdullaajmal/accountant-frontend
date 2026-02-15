import { Form, Input, Switch, Row, Col, Divider, Card } from 'antd';
import useLanguage from '@/locale/useLanguage';

export default function RoleForm({ current = null }) {
  const translate = useLanguage();

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="roleCode"
            label={translate('Role Code')}
            rules={[{ required: true }]}
          >
            <Input placeholder={translate('Role Code')} style={{ textTransform: 'uppercase' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="roleName"
            label={translate('Role Name')}
            rules={[{ required: true }]}
          >
            <Input placeholder={translate('Role Name')} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="description" label={translate('Description')}>
        <Input.TextArea rows={3} placeholder={translate('Description')} />
      </Form.Item>

      <Form.Item name="enabled" label={translate('Status')} valuePropName="checked" initialValue={true}>
        <Switch checkedChildren={translate('Active')} unCheckedChildren={translate('Inactive')} />
      </Form.Item>

      <Divider orientation="left">{translate('Permissions')}</Divider>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card size="small" title={translate('Core Business')}>
            <Form.Item name={['permissions', 'dashboard']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Dashboard')}
            </Form.Item>
            <Form.Item name={['permissions', 'customers']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Customers')}
            </Form.Item>
            <Form.Item name={['permissions', 'suppliers']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Suppliers')}
            </Form.Item>
            <Form.Item name={['permissions', 'invoices']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Invoices')}
            </Form.Item>
            <Form.Item name={['permissions', 'quotes']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Quotes')}
            </Form.Item>
            <Form.Item name={['permissions', 'payments']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Payments')}
            </Form.Item>
            <Form.Item name={['permissions', 'expenses']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Expenses')}
            </Form.Item>
            <Form.Item name={['permissions', 'packages']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Packages')}
            </Form.Item>
          </Card>
        </Col>

        <Col span={12}>
          <Card size="small" title={translate('Travel Agency')}>
            <Form.Item name={['permissions', 'visaPackages']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Visa Packages')}
            </Form.Item>
            <Form.Item name={['permissions', 'hotelBookings']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Hotel Bookings')}
            </Form.Item>
          </Card>
        </Col>

        <Col span={12}>
          <Card size="small" title={translate('Accounting')}>
            <Form.Item name={['permissions', 'accounts']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Accounts')}
            </Form.Item>
            <Form.Item name={['permissions', 'journalEntries']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Journal Entries')}
            </Form.Item>
            <Form.Item name={['permissions', 'bankAccounts']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Bank Accounts')}
            </Form.Item>
            <Form.Item name={['permissions', 'financialYear']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Financial Year')}
            </Form.Item>
            <Form.Item name={['permissions', 'ledgerPostingRules']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Ledger Posting Rules')}
            </Form.Item>
          </Card>
        </Col>

        <Col span={12}>
          <Card size="small" title={translate('HR & Payroll')}>
            <Form.Item name={['permissions', 'employees']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Employees')}
            </Form.Item>
            <Form.Item name={['permissions', 'attendance']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Attendance')}
            </Form.Item>
            <Form.Item name={['permissions', 'payroll']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Payroll')}
            </Form.Item>
            <Form.Item name={['permissions', 'commission']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Commission')}
            </Form.Item>
          </Card>
        </Col>

        <Col span={12}>
          <Card size="small" title={translate('Organization')}>
            <Form.Item name={['permissions', 'company']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Company')}
            </Form.Item>
            <Form.Item name={['permissions', 'branches']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Branches')}
            </Form.Item>
          </Card>
        </Col>

        <Col span={12}>
          <Card size="small" title={translate('Reports & Documents')}>
            <Form.Item name={['permissions', 'reports']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Reports')}
            </Form.Item>
            <Form.Item name={['permissions', 'financialReports']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Financial Reports')}
            </Form.Item>
            <Form.Item name={['permissions', 'businessReports']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Business Reports')}
            </Form.Item>
            <Form.Item name={['permissions', 'documents']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Documents')}
            </Form.Item>
          </Card>
        </Col>

        <Col span={12}>
          <Card size="small" title={translate('System')}>
            <Form.Item name={['permissions', 'settings']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Settings')}
            </Form.Item>
            <Form.Item name={['permissions', 'roles']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Roles')}
            </Form.Item>
            <Form.Item name={['permissions', 'users']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Users')}
            </Form.Item>
            <Form.Item name={['permissions', 'loginHistory']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Login History')}
            </Form.Item>
          </Card>
        </Col>

        <Col span={12}>
          <Card size="small" title={translate('Actions')}>
            <Form.Item name={['permissions', 'canCreate']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Can Create')}
            </Form.Item>
            <Form.Item name={['permissions', 'canUpdate']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Can Update')}
            </Form.Item>
            <Form.Item name={['permissions', 'canDelete']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Can Delete')}
            </Form.Item>
            <Form.Item name={['permissions', 'canView']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Can View')}
            </Form.Item>
            <Form.Item name={['permissions', 'canExport']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Can Export')}
            </Form.Item>
            <Form.Item name={['permissions', 'canApprove']} valuePropName="checked" initialValue={false}>
              <Switch size="small" /> {translate('Can Approve')}
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </>
  );
}
