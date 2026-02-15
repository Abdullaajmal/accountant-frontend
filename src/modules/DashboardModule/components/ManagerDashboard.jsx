import { useEffect, useState } from 'react';
import { Tag, Row, Col, Card, Statistic, Table } from 'antd';
import { 
  UserOutlined, 
  TeamOutlined, 
  DollarOutlined, 
  ShoppingOutlined,
  CalendarOutlined,
  TrophyOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import { useMoney } from '@/settings';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import useOnFetch from '@/hooks/useOnFetch';
import { selectMoneyFormat } from '@/redux/settings/selectors';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

export default function ManagerDashboard() {
  const translate = useLanguage();
  const { moneyFormatter } = useMoney();
  const money_format_settings = useSelector(selectMoneyFormat);

  const {
    result: customerSummary,
    isLoading: customerLoading,
    onFetch: fetchCustomerSummary,
  } = useOnFetch();

  const {
    result: invoiceSummary,
    isLoading: invoiceLoading,
    onFetch: fetchInvoiceSummary,
  } = useOnFetch();

  const {
    result: employeeSummary,
    isLoading: employeeLoading,
    onFetch: fetchEmployeeSummary,
  } = useOnFetch();

  const {
    result: commissionSummary,
    isLoading: commissionLoading,
    onFetch: fetchCommissionSummary,
  } = useOnFetch();

  const {
    result: recentInvoices,
    isLoading: invoicesLoading,
  } = useFetch(() => request.list({ entity: 'invoice', options: { page: 1, items: 5 } }));

  const {
    result: recentEmployees,
    isLoading: employeesLoading,
  } = useFetch(() => request.list({ entity: 'employee', options: { page: 1, items: 5 } }));

  useEffect(() => {
    const currency = money_format_settings.default_currency_code || null;
    if (currency) {
      fetchCustomerSummary(request.summary({ entity: 'client' }));
      fetchInvoiceSummary(request.summary({ entity: 'invoice', options: { currency } }));
      fetchEmployeeSummary(request.summary({ entity: 'employee' }));
      fetchCommissionSummary(request.summary({ entity: 'commission' }));
    }
  }, [money_format_settings.default_currency_code]);

  const invoiceColumns = [
    {
      title: translate('Date'),
      dataIndex: 'date',
      render: (date) => (date ? dayjs(date).format('DD/MM/YYYY') : '-'),
    },
    {
      title: translate('Number'),
      dataIndex: 'number',
    },
    {
      title: translate('Client'),
      dataIndex: ['client', 'name'],
    },
    {
      title: translate('Total'),
      dataIndex: 'total',
      render: (total) => moneyFormatter(total),
    },
    {
      title: translate('Status'),
      dataIndex: 'invoiceStatus',
      render: (status) => (
        <Tag color={status === 'paid' ? 'green' : status === 'partial' ? 'orange' : 'red'}>
          {translate(status || 'unpaid')}
        </Tag>
      ),
    },
  ];

  const employeeColumns = [
    {
      title: translate('Name'),
      render: (_, record) => `${record.firstName || ''} ${record.lastName || ''}`,
    },
    {
      title: translate('Email'),
      dataIndex: 'email',
    },
    {
      title: translate('Designation'),
      dataIndex: 'designation',
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {translate(status || 'inactive')}
        </Tag>
      ),
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Card>
            <h2 style={{ margin: 0, color: '#52c41a' }}>
              {translate('Manager Dashboard')}
            </h2>
            <p style={{ margin: '8px 0 0', color: '#666' }}>
              {translate('Business operations and team management overview')}
            </p>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={translate('Total Customers')}
              value={customerSummary?.total || 0}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={translate('Total Invoices')}
              value={invoiceSummary?.total || 0}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={translate('Total Employees')}
              value={employeeSummary?.total || 0}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={translate('Commission Records')}
              value={commissionSummary?.total || 0}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title={translate('Recent Invoices')} loading={invoicesLoading}>
            <Table
              columns={invoiceColumns}
              dataSource={recentInvoices?.result || []}
              pagination={false}
              size="small"
              rowKey="_id"
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title={translate('Recent Employees')} loading={employeesLoading}>
            <Table
              columns={employeeColumns}
              dataSource={recentEmployees?.result || []}
              pagination={false}
              size="small"
              rowKey="_id"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title={translate('Quick Actions')}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Card
                  hoverable
                  onClick={() => window.location.href = '/invoice/create'}
                  style={{ textAlign: 'center', cursor: 'pointer' }}
                >
                  <ShoppingOutlined style={{ fontSize: 32, color: '#1890ff' }} />
                  <div style={{ marginTop: 8 }}>{translate('Create Invoice')}</div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card
                  hoverable
                  onClick={() => window.location.href = '/employee/create'}
                  style={{ textAlign: 'center', cursor: 'pointer' }}
                >
                  <TeamOutlined style={{ fontSize: 32, color: '#52c41a' }} />
                  <div style={{ marginTop: 8 }}>{translate('Add Employee')}</div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card
                  hoverable
                  onClick={() => window.location.href = '/attendance'}
                  style={{ textAlign: 'center', cursor: 'pointer' }}
                >
                  <CalendarOutlined style={{ fontSize: 32, color: '#faad14' }} />
                  <div style={{ marginTop: 8 }}>{translate('View Attendance')}</div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card
                  hoverable
                  onClick={() => window.location.href = '/visapackage/create'}
                  style={{ textAlign: 'center', cursor: 'pointer' }}
                >
                  <GlobalOutlined style={{ fontSize: 32, color: '#722ed1' }} />
                  <div style={{ marginTop: 8 }}>{translate('Add Visa Package')}</div>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}
