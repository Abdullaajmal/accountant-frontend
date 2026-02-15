import { useState } from 'react';
import { Card, Table, DatePicker, Button, Space, Statistic, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import { useDate, useMoney } from '@/settings';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

export default function BusinessInsights() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const { moneyFormatter } = useMoney();
  const [dateRange, setDateRange] = useState(null);

  const fetchBusinessInsights = async () => {
    const options = {};
    if (dateRange?.[0]) options.startDate = dateRange[0].format('YYYY-MM-DD');
    if (dateRange?.[1]) options.endDate = dateRange[1].format('YYYY-MM-DD');

    return await request.get({ entity: 'booking/businessinsights', options });
  };

  const { result: insightsResult, isLoading, onFetch: fetchData } = useFetch(fetchBusinessInsights);

  const topPackagesColumns = [
    {
      title: translate('Package Code'),
      dataIndex: 'packageCode',
    },
    {
      title: translate('Package Name'),
      dataIndex: 'packageName',
    },
    {
      title: translate('Booking Count'),
      dataIndex: 'bookingCount',
      align: 'right',
    },
    {
      title: translate('Total Revenue'),
      dataIndex: 'totalRevenue',
      render: (amount) => amount?.toFixed(2) || '0.00',
      align: 'right',
    },
  ];

  const lowProfitColumns = [
    {
      title: translate('Booking Number'),
      dataIndex: 'bookingNumber',
    },
    {
      title: translate('Date'),
      dataIndex: 'bookingDate',
      render: (date) => dayjs(date).format(dateFormat),
    },
    {
      title: translate('Package'),
      dataIndex: 'package',
    },
    {
      title: translate('Revenue'),
      dataIndex: 'revenue',
      render: (amount) => amount?.toFixed(2) || '0.00',
      align: 'right',
    },
    {
      title: translate('Commission'),
      dataIndex: 'commission',
      render: (amount) => amount?.toFixed(2) || '0.00',
      align: 'right',
    },
    {
      title: translate('Profit'),
      dataIndex: 'profit',
      render: (amount) => (
        <span style={{ color: amount >= 0 ? '#3f8600' : '#cf1322' }}>
          {amount?.toFixed(2) || '0.00'}
        </span>
      ),
      align: 'right',
    },
    {
      title: translate('Profit Margin (%)'),
      dataIndex: 'profitMargin',
      render: (margin) => `${margin?.toFixed(2) || 0}%`,
      align: 'right',
    },
  ];

  return (
    <Card title={translate('Business Insights')}>
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

      {insightsResult && insightsResult.result && (
        <>
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={8}>
              <Card>
                <Statistic
                  title={translate('Total Bookings')}
                  value={insightsResult.result.summary?.totalBookings || 0}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title={translate('Total Revenue')}
                  value={insightsResult.result.summary?.totalRevenue || 0}
                  precision={2}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title={translate('Average Profit Margin')}
                  value={insightsResult.result.summary?.averageProfitMargin || 0}
                  precision={2}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Card title={translate('Top Packages by Revenue')} style={{ marginBottom: 16 }}>
                <Table
                  columns={topPackagesColumns}
                  dataSource={insightsResult.result.topPackages || []}
                  loading={isLoading}
                  rowKey="packageCode"
                  pagination={false}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title={translate('Low Profit Bookings')} style={{ marginBottom: 16 }}>
                <Table
                  columns={lowProfitColumns}
                  dataSource={insightsResult.result.lowProfitBookings || []}
                  loading={isLoading}
                  rowKey="bookingNumber"
                  pagination={false}
                />
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Card>
  );
}
