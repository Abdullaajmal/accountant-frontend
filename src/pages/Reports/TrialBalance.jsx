import { useState } from 'react';
import { Card, Table, DatePicker, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import { useDate } from '@/settings';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

export default function TrialBalance() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const [dateRange, setDateRange] = useState(null);

  const fetchTrialBalance = async () => {
    const options = {};
    if (dateRange?.[0]) options.startDate = dateRange[0].format('YYYY-MM-DD');
    if (dateRange?.[1]) options.endDate = dateRange[1].format('YYYY-MM-DD');

    return await request.get({ entity: 'journalentry/trialbalance', options });
  };

  const { result: trialBalanceResult, isLoading, onFetch: fetchData } = useFetch(fetchTrialBalance);

  const columns = [
    {
      title: translate('Account Code'),
      dataIndex: 'accountCode',
    },
    {
      title: translate('Account Name'),
      dataIndex: 'accountName',
    },
    {
      title: translate('Account Type'),
      dataIndex: 'accountType',
    },
    {
      title: translate('Opening Balance'),
      dataIndex: 'openingBalance',
      render: (amount) => amount?.toFixed(2) || '0.00',
    },
    {
      title: translate('Debit'),
      dataIndex: 'debit',
      render: (amount) => amount?.toFixed(2) || '0.00',
    },
    {
      title: translate('Credit'),
      dataIndex: 'credit',
      render: (amount) => amount?.toFixed(2) || '0.00',
    },
    {
      title: translate('Balance'),
      dataIndex: 'balance',
      render: (amount) => amount?.toFixed(2) || '0.00',
    },
  ];

  return (
    <Card title={translate('Trial Balance')}>
      <Space style={{ marginBottom: 16 }}>
        <RangePicker
          value={dateRange}
          onChange={setDateRange}
          format={dateFormat}
        />
        <Button type="primary" icon={<SearchOutlined />} onClick={fetchData}>
          {translate('Search')}
        </Button>
      </Space>

      {trialBalanceResult?.totals && (
        <div style={{ marginBottom: 16, textAlign: 'right' }}>
          <p>
            <strong>{translate('Total Debit')}:</strong> {trialBalanceResult.totals.totalDebit?.toFixed(2)}
          </p>
          <p>
            <strong>{translate('Total Credit')}:</strong> {trialBalanceResult.totals.totalCredit?.toFixed(2)}
          </p>
        </div>
      )}

      <Table
        columns={columns}
        dataSource={trialBalanceResult?.trialBalance || []}
        loading={isLoading}
        rowKey="accountCode"
        pagination={false}
      />
    </Card>
  );
}
