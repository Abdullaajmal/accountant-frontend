import { useState } from 'react';
import { Card, Table, DatePicker, Button, Space, Statistic, Row, Col, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import { useDate, useMoney } from '@/settings';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

export default function ProfitAnalysis() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const { moneyFormatter } = useMoney();
  const [dateRange, setDateRange] = useState(null);
  const [bookingId, setBookingId] = useState(null);

  const { result: bookingsResult } = useFetch(() => request.list({ entity: 'booking' }));

  const fetchProfitAnalysis = async () => {
    const options = {};
    if (bookingId) options.bookingId = bookingId;
    if (dateRange?.[0]) options.startDate = dateRange[0].format('YYYY-MM-DD');
    if (dateRange?.[1]) options.endDate = dateRange[1].format('YYYY-MM-DD');

    return await request.get({ entity: 'booking/profitanalysis', options });
  };

  const { result: analysisResult, isLoading, onFetch: fetchData } = useFetch(fetchProfitAnalysis);

  const columns = [
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
      title: translate('Client'),
      dataIndex: 'client',
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
      title: translate('Expenses'),
      dataIndex: 'expenses',
      render: (amount) => amount?.toFixed(2) || '0.00',
      align: 'right',
    },
    {
      title: translate('Profit'),
      dataIndex: 'profit',
      render: (amount, record) => (
        <span style={{ color: amount >= 0 ? '#3f8600' : '#cf1322' }}>
          {amount?.toFixed(2) || '0.00'}
        </span>
      ),
      align: 'right',
    },
    {
      title: translate('Profit Margin (%)'),
      dataIndex: 'profitMargin',
      render: (margin) => `${margin}%`,
      align: 'right',
    },
  ];

  return (
    <Card title={translate('Booking Profit Analysis')}>
      <Space style={{ marginBottom: 16 }}>
        <Select
          style={{ width: 300 }}
          placeholder={translate('Select Booking (Optional)')}
          value={bookingId}
          onChange={setBookingId}
          allowClear
          showSearch
          optionFilterProp="children"
        >
          {bookingsResult?.items?.map((booking) => (
            <Select.Option key={booking._id} value={booking._id}>
              {booking.bookingNumber} - {booking.client?.name || 'N/A'}
            </Select.Option>
          ))}
        </Select>
        <RangePicker
          value={dateRange}
          onChange={setDateRange}
          format={dateFormat}
        />
        <Button type="primary" icon={<SearchOutlined />} onClick={fetchData}>
          {translate('Search')}
        </Button>
      </Space>

      {analysisResult && analysisResult.result && (
        <>
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={6}>
              <Card>
                <Statistic
                  title={translate('Total Revenue')}
                  value={analysisResult.result.summary?.totalRevenue || 0}
                  precision={2}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title={translate('Total Commission')}
                  value={analysisResult.result.summary?.totalCommission || 0}
                  precision={2}
                  valueStyle={{ color: '#ff9800' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title={translate('Total Expenses')}
                  value={analysisResult.result.summary?.totalExpenses || 0}
                  precision={2}
                  valueStyle={{ color: '#ff4d4f' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title={translate('Total Profit')}
                  value={analysisResult.result.summary?.totalProfit || 0}
                  precision={2}
                  valueStyle={{
                    color: (analysisResult.result.summary?.totalProfit || 0) >= 0 ? '#3f8600' : '#cf1322',
                  }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={12}>
              <Card>
                <Statistic
                  title={translate('Average Profit Margin')}
                  value={analysisResult.result.summary?.averageProfitMargin || 0}
                  precision={2}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic
                  title={translate('Total Bookings')}
                  value={analysisResult.result.summary?.totalBookings || 0}
                />
              </Card>
            </Col>
          </Row>

          <Table
            columns={columns}
            dataSource={analysisResult.result.bookings || []}
            loading={isLoading}
            rowKey="bookingId"
            pagination={{ pageSize: 10 }}
          />
        </>
      )}
    </Card>
  );
}
