import { useState } from 'react';
import { Card, Table, DatePicker, Button, Space, Statistic, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import { useDate, useMoney } from '@/settings';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import dayjs from 'dayjs';

export default function BalanceSheet() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const { moneyFormatter } = useMoney();
  const [asOnDate, setAsOnDate] = useState(dayjs());

  const fetchBalanceSheet = async () => {
    const options = {};
    if (asOnDate) options.asOnDate = asOnDate.format('YYYY-MM-DD');

    return await request.get({ entity: 'journalentry/balancesheet', options });
  };

  const { result: balanceSheetResult, isLoading, onFetch: fetchData } = useFetch(fetchBalanceSheet);

  const assetColumns = [
    {
      title: translate('Account Code'),
      dataIndex: 'accountCode',
    },
    {
      title: translate('Account Name'),
      dataIndex: 'accountName',
    },
    {
      title: translate('Balance'),
      dataIndex: 'balance',
      render: (amount) => amount?.toFixed(2) || '0.00',
      align: 'right',
    },
  ];

  const liabilityColumns = [
    {
      title: translate('Account Code'),
      dataIndex: 'accountCode',
    },
    {
      title: translate('Account Name'),
      dataIndex: 'accountName',
    },
    {
      title: translate('Balance'),
      dataIndex: 'balance',
      render: (amount) => amount?.toFixed(2) || '0.00',
      align: 'right',
    },
  ];

  const equityColumns = [
    {
      title: translate('Account Code'),
      dataIndex: 'accountCode',
    },
    {
      title: translate('Account Name'),
      dataIndex: 'accountName',
    },
    {
      title: translate('Balance'),
      dataIndex: 'balance',
      render: (amount) => amount?.toFixed(2) || '0.00',
      align: 'right',
    },
  ];

  return (
    <Card title={translate('Balance Sheet')}>
      <Space style={{ marginBottom: 16 }}>
        <DatePicker
          value={asOnDate}
          onChange={setAsOnDate}
          format={dateFormat}
          placeholder={translate('As On Date')}
        />
        <Button type="primary" icon={<SearchOutlined />} onClick={fetchData}>
          {translate('Search')}
        </Button>
      </Space>

      {balanceSheetResult && (
        <>
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={8}>
              <Card>
                <Statistic
                  title={translate('Total Assets')}
                  value={balanceSheetResult.totals?.totalAssets || 0}
                  precision={2}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title={translate('Total Liabilities')}
                  value={balanceSheetResult.totals?.totalLiabilities || 0}
                  precision={2}
                  valueStyle={{ color: '#ff4d4f' }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title={translate('Total Equity')}
                  value={balanceSheetResult.totals?.totalEquity || 0}
                  precision={2}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Card title={translate('Assets')} style={{ marginBottom: 16 }}>
                <Table
                  columns={assetColumns}
                  dataSource={balanceSheetResult.assets?.accounts || []}
                  loading={isLoading}
                  rowKey="accountCode"
                  pagination={false}
                  summary={(pageData) => {
                    const total = pageData.reduce((sum, record) => sum + (record.balance || 0), 0);
                    return (
                      <Table.Summary fixed>
                        <Table.Summary.Row>
                          <Table.Summary.Cell index={0} colSpan={2}>
                            <strong>{translate('Total Assets')}</strong>
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
            <Col span={8}>
              <Card title={translate('Liabilities')} style={{ marginBottom: 16 }}>
                <Table
                  columns={liabilityColumns}
                  dataSource={balanceSheetResult.liabilities?.accounts || []}
                  loading={isLoading}
                  rowKey="accountCode"
                  pagination={false}
                  summary={(pageData) => {
                    const total = pageData.reduce((sum, record) => sum + (record.balance || 0), 0);
                    return (
                      <Table.Summary fixed>
                        <Table.Summary.Row>
                          <Table.Summary.Cell index={0} colSpan={2}>
                            <strong>{translate('Total Liabilities')}</strong>
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
            <Col span={8}>
              <Card title={translate('Equity')} style={{ marginBottom: 16 }}>
                <Table
                  columns={equityColumns}
                  dataSource={balanceSheetResult.equity?.accounts || []}
                  loading={isLoading}
                  rowKey="accountCode"
                  pagination={false}
                  summary={(pageData) => {
                    const total = pageData.reduce((sum, record) => sum + (record.balance || 0), 0);
                    return (
                      <Table.Summary fixed>
                        <Table.Summary.Row>
                          <Table.Summary.Cell index={0} colSpan={2}>
                            <strong>{translate('Total Equity')}</strong>
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

          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={24}>
              <Card>
                <Row gutter={16}>
                  <Col span={12}>
                    <Statistic
                      title={translate('Total Assets')}
                      value={balanceSheetResult.totals?.totalAssets || 0}
                      precision={2}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title={translate('Total Liabilities + Equity')}
                      value={balanceSheetResult.totals?.totalLiabilitiesAndEquity || 0}
                      precision={2}
                    />
                  </Col>
                </Row>
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                  {Math.abs((balanceSheetResult.totals?.totalAssets || 0) - (balanceSheetResult.totals?.totalLiabilitiesAndEquity || 0)) < 0.01 ? (
                    <span style={{ color: '#52c41a', fontSize: 16 }}>
                      ✓ {translate('Balance Sheet is Balanced')}
                    </span>
                  ) : (
                    <span style={{ color: '#ff4d4f', fontSize: 16 }}>
                      ⚠ {translate('Balance Sheet is not Balanced')}
                    </span>
                  )}
                </div>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Card>
  );
}
