import { useState } from 'react';
import { Card, Table, DatePicker, Select, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import { useDate, useMoney } from '@/settings';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

export default function Ledger() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const { moneyFormatter } = useMoney();
  const [accountId, setAccountId] = useState(null);
  const [dateRange, setDateRange] = useState(null);

  const { result: accountsResult } = useFetch(() => request.list({ entity: 'account' }));

  const fetchLedger = async () => {
    if (!accountId) return;
    const options = {};
    options.accountId = accountId;
    if (dateRange?.[0]) options.startDate = dateRange[0].format('YYYY-MM-DD');
    if (dateRange?.[1]) options.endDate = dateRange[1].format('YYYY-MM-DD');

    return await request.get({ entity: 'journalentry/ledger', options });
  };

  const { result: ledgerResult, isLoading, onFetch: fetchLedgerData } = useFetch(fetchLedger, {
    skip: !accountId,
  });

  const columns = [
    {
      title: translate('Date'),
      dataIndex: 'date',
      render: (date) => dayjs(date).format(dateFormat),
    },
    {
      title: translate('Entry Number'),
      dataIndex: 'entryNumber',
    },
    {
      title: translate('Reference'),
      dataIndex: 'reference',
    },
    {
      title: translate('Narration'),
      dataIndex: 'narration',
    },
    {
      title: translate('Debit'),
      dataIndex: 'debit',
      render: (amount) => amount > 0 ? amount.toFixed(2) : '-',
    },
    {
      title: translate('Credit'),
      dataIndex: 'credit',
      render: (amount) => amount > 0 ? amount.toFixed(2) : '-',
    },
    {
      title: translate('Balance'),
      dataIndex: 'balance',
      render: (balance) => balance?.toFixed(2) || '0.00',
    },
  ];

  return (
    <Card title={translate('General Ledger')}>
      <Space style={{ marginBottom: 16 }}>
        <Select
          style={{ width: 300 }}
          placeholder={translate('Select Account')}
          value={accountId}
          onChange={setAccountId}
          showSearch
          optionFilterProp="children"
        >
          {accountsResult?.items?.map((account) => (
            <Select.Option key={account._id} value={account._id}>
              {account.accountCode} - {account.accountName}
            </Select.Option>
          ))}
        </Select>
        <RangePicker
          value={dateRange}
          onChange={setDateRange}
          format={dateFormat}
        />
        <Button type="primary" icon={<SearchOutlined />} onClick={fetchLedgerData}>
          {translate('Search')}
        </Button>
      </Space>

      {ledgerResult && (
        <div style={{ marginBottom: 16 }}>
          <p>
            <strong>{translate('Account')}:</strong> {ledgerResult.account?.accountCode} - {ledgerResult.account?.accountName}
          </p>
          <p>
            <strong>{translate('Opening Balance')}:</strong> {ledgerResult.openingBalance?.toFixed(2)}
          </p>
          <p>
            <strong>{translate('Closing Balance')}:</strong> {ledgerResult.closingBalance?.toFixed(2)}
          </p>
        </div>
      )}

      <Table
        columns={columns}
        dataSource={ledgerResult?.entries || []}
        loading={isLoading}
        rowKey={(record, index) => index}
        pagination={false}
      />
    </Card>
  );
}
