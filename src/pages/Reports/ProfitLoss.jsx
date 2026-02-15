import { useState } from 'react';
import { Card, Table, DatePicker, Button, Space, Statistic, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import { useDate, useMoney } from '@/settings';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

export default function ProfitLoss() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const { moneyFormatter } = useMoney();
  const [dateRange, setDateRange] = useState(null);

  const fetchProfitLoss = async () => {
    const options = {};
    if (dateRange?.[0]) options.startDate = dateRange[0].format('YYYY-MM-DD');
    if (dateRange?.[1]) options.endDate = dateRange[1].format('YYYY-MM-DD');

    return await request.get({ entity: 'journalentry/profitloss', options });
  };

  const { result: profitLossResult, isLoading, onFetch: fetchData } = useFetch(fetchProfitLoss);

  const incomeColumns = [
    {
      title: translate('Account Code'),
      dataIndex: 'accountCode',
    },
    {
      title: translate('Account Name'),
      dataIndex: 'accountName',
    },
    {
      title: translate('Amount'),
      dataIndex: 'balance',
      render: (amount) => amount?.toFixed(2) || '0.00',
      align: 'right',
    },
  ];

  const expenseColumns = [
    {
      title: translate('Account Code'),
      dataIndex: 'accountCode',
    },
    {
      title: translate('Account Name'),
      dataIndex: 'accountName',
    },
    {
      title: translate('Amount'),
      dataIndex: 'balance',
      render: (amount) => amount?.toFixed(2) || '0.00',
      align: 'right',
    },
  ];

  return (
    <Card title={translate('Profit & Loss Report')}>
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

      {profitLossResult && (
        <>
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={8}>
              <Card>
                <Statistic
                  title={translate('Total Income')}
                  value={profitLossResult.income?.total || 0}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title={translate('Total Expenses')}
                  value={profitLossResult.expenses?.total || 0}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title={profitLossResult.netProfit >= 0 ? translate('Net Profit') : translate('Net Loss')}
                  value={Math.abs(profitLossResult.netProfit || 0)}
                  precision={2}
                  valueStyle={{ color: profitLossResult.netProfit >= 0 ? '#3f8600' : '#cf1322' }}
                  prefix={profitLossResult.netProfit >= 0 ? '+' : '-'}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Card title={translate('Income')} style={{ marginBottom: 16 }}>
                <Table
                  columns={incomeColumns}
                  dataSource={profitLossResult.income?.accounts || []}
                  loading={isLoading}
                  rowKey="accountCode"
                  pagination={false}
                  summary={(pageData) => {
                    const total = pageData.reduce((sum, record) => sum + (record.balance || 0), 0);
                    return (
                      <Table.Summary fixed>
                        <Table.Summary.Row>
                          <Table.Summary.Cell index={0} colSpan={2}>
                            <strong>{translate('Total')}</strong>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={1} align="right">
                            <strong>{total.toFixed(2)}</strong>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      </Table.Summary>
                    );
                  }}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title={translate('Expenses')} style={{ marginBottom: 16 }}>
                <Table
                  columns={expenseColumns}
                  dataSource={profitLossResult.expenses?.accounts || []}
                  loading={isLoading}
                  rowKey="accountCode"
                  pagination={false}
                  summary={(pageData) => {
                    const total = pageData.reduce((sum, record) => sum + (record.balance || 0), 0);
                    return (
                      <Table.Summary fixed>
                        <Table.Summary.Row>
                          <Table.Summary.Cell index={0} colSpan={2}>
                            <strong>{translate('Total')}</strong>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={1} align="right">
                            <strong>{total.toFixed(2)}</strong>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      </Table.Summary>
                    );
                  }}
                />
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Card>
  );
}
