import { useEffect, useState } from 'react';
import { Tag, Row, Col, Card, Statistic, Table } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, DollarOutlined, AccountBookOutlined, BankOutlined, FileTextOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import { useMoney } from '@/settings';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import useOnFetch from '@/hooks/useOnFetch';
import { selectMoneyFormat } from '@/redux/settings/selectors';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

export default function AccountantDashboard() {
  const translate = useLanguage();
  const { moneyFormatter } = useMoney();
  const money_format_settings = useSelector(selectMoneyFormat);

  const {
    result: accountSummary,
    isLoading: accountLoading,
    onFetch: fetchAccountSummary,
  } = useOnFetch();

  const {
    result: journalSummary,
    isLoading: journalLoading,
    onFetch: fetchJournalSummary,
  } = useOnFetch();

  const {
    result: bankSummary,
    isLoading: bankLoading,
    onFetch: fetchBankSummary,
  } = useOnFetch();

  const {
    result: financialYear,
    isLoading: fyLoading,
  } = useFetch(() => request.get({ entity: 'financialyear/current' }));

  const {
    result: recentJournalEntries,
    isLoading: journalEntriesLoading,
  } = useFetch(() => request.list({ entity: 'journalentry', options: { page: 1, items: 5 } }));

  const {
    result: recentPayments,
    isLoading: paymentsLoading,
  } = useFetch(() => request.list({ entity: 'payment', options: { page: 1, items: 5 } }));

  useEffect(() => {
    const currency = money_format_settings?.default_currency_code || null;
    // useOnFetch expects a promise, not a function
    // Entity names: account, journalentry, bankaccount (not bank-account)
    if (currency) {
      fetchAccountSummary(request.summary({ entity: 'account', options: { currency } }));
      fetchJournalSummary(request.summary({ entity: 'journalentry', options: { currency } }));
      fetchBankSummary(request.summary({ entity: 'bankaccount', options: { currency } }));
    } else {
      // Even without currency, fetch summaries without currency option
      fetchAccountSummary(request.summary({ entity: 'account' }));
      fetchJournalSummary(request.summary({ entity: 'journalentry' }));
      fetchBankSummary(request.summary({ entity: 'bankaccount' }));
    }
  }, [money_format_settings?.default_currency_code]);

  const journalColumns = [
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
      title: translate('Description'),
      dataIndex: 'description',
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
      render: (status) => (
        <Tag color={status === 'posted' ? 'green' : 'orange'}>
          {translate(status || 'draft')}
        </Tag>
      ),
    },
  ];

  const paymentColumns = [
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
      title: translate('Amount'),
      dataIndex: 'amount',
      render: (amount) => moneyFormatter(amount),
    },
    {
      title: translate('Status'),
      dataIndex: 'paymentStatus',
      render: (status) => (
        <Tag color={status === 'paid' ? 'green' : 'orange'}>
          {translate(status || 'pending')}
        </Tag>
      ),
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Card>
            <h2 style={{ margin: 0, color: '#1890ff' }}>
              {translate('Accountant Dashboard')}
            </h2>
            <p style={{ margin: '8px 0 0', color: '#666' }}>
              {translate('Financial overview and accounting operations')}
            </p>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={translate('Total Accounts')}
              value={accountSummary?.total || 0}
              prefix={<AccountBookOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={translate('Journal Entries')}
              value={journalSummary?.total || 0}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={translate('Bank Accounts')}
              value={bankSummary?.total || 0}
              prefix={<BankOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={translate('Current Financial Year')}
              value={financialYear?.result?.yearName || '-'}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title={translate('Recent Journal Entries')} loading={journalEntriesLoading}>
            <Table
              columns={journalColumns}
              dataSource={recentJournalEntries?.result || []}
              pagination={false}
              size="small"
              rowKey="_id"
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title={translate('Recent Payments')} loading={paymentsLoading}>
            <Table
              columns={paymentColumns}
              dataSource={recentPayments?.result || []}
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
                  onClick={() => window.location.href = '/journalentry/create'}
                  style={{ textAlign: 'center', cursor: 'pointer' }}
                >
                  <FileTextOutlined style={{ fontSize: 32, color: '#1890ff' }} />
                  <div style={{ marginTop: 8 }}>{translate('Create Journal Entry')}</div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card
                  hoverable
                  onClick={() => window.location.href = '/account/create'}
                  style={{ textAlign: 'center', cursor: 'pointer' }}
                >
                  <AccountBookOutlined style={{ fontSize: 32, color: '#52c41a' }} />
                  <div style={{ marginTop: 8 }}>{translate('Create Account')}</div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card
                  hoverable
                  onClick={() => window.location.href = '/bank-account/create'}
                  style={{ textAlign: 'center', cursor: 'pointer' }}
                >
                  <BankOutlined style={{ fontSize: 32, color: '#faad14' }} />
                  <div style={{ marginTop: 8 }}>{translate('Add Bank Account')}</div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card
                  hoverable
                  onClick={() => window.location.href = '/reports'}
                  style={{ textAlign: 'center', cursor: 'pointer' }}
                >
                  <DollarOutlined style={{ fontSize: 32, color: '#722ed1' }} />
                  <div style={{ marginTop: 8 }}>{translate('Financial Reports')}</div>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}
