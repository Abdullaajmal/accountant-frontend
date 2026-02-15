import { useState } from 'react';
import { Card, Table, DatePicker, Select, Button, Space, Statistic, Row, Col, Radio } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import { useDate, useMoney } from '@/settings';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

export default function CommissionReport() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const { moneyFormatter } = useMoney();
  const [dateRange, setDateRange] = useState(null);
  const [supplierId, setSupplierId] = useState(null);
  const [groupBy, setGroupBy] = useState('supplier');

  const { result: suppliersResult } = useFetch(() => request.list({ entity: 'supplier' }));

  const fetchCommissionReport = async () => {
    const options = { groupBy };
    if (supplierId) options.supplierId = supplierId;
    if (dateRange?.[0]) options.startDate = dateRange[0].format('YYYY-MM-DD');
    if (dateRange?.[1]) options.endDate = dateRange[1].format('YYYY-MM-DD');

    return await request.get({ entity: 'booking/commissionreport', options });
  };

  const { result: reportResult, isLoading, onFetch: fetchData } = useFetch(fetchCommissionReport);

  const supplierColumns = [
    {
      title: translate('Supplier Code'),
      dataIndex: 'supplierCode',
    },
    {
      title: translate('Supplier Name'),
      dataIndex: 'supplierName',
    },
    {
      title: translate('Commission Rate (%)'),
      dataIndex: 'commissionRate',
      render: (rate) => `${rate?.toFixed(2) || 0}%`,
    },
    {
      title: translate('Total Bookings'),
      dataIndex: 'totalBookings',
      align: 'right',
    },
    {
      title: translate('Total Revenue'),
      dataIndex: 'totalRevenue',
      render: (amount) => amount?.toFixed(2) || '0.00',
      align: 'right',
    },
    {
      title: translate('Total Commission'),
      dataIndex: 'totalCommission',
      render: (amount) => amount?.toFixed(2) || '0.00',
      align: 'right',
    },
    {
      title: translate('Average Commission'),
      dataIndex: 'averageCommission',
      render: (amount) => amount?.toFixed(2) || '0.00',
      align: 'right',
    },
  ];

  const bookingColumns = [
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
      title: translate('Supplier'),
      dataIndex: 'supplier',
    },
    {
      title: translate('Package'),
      dataIndex: 'package',
    },
    {
      title: translate('Total'),
      dataIndex: 'total',
      render: (amount) => amount?.toFixed(2) || '0.00',
      align: 'right',
    },
    {
      title: translate('Commission Rate (%)'),
      dataIndex: 'commissionRate',
      render: (rate) => `${rate?.toFixed(2) || 0}%`,
    },
    {
      title: translate('Commission'),
      dataIndex: 'commission',
      render: (amount) => amount?.toFixed(2) || '0.00',
      align: 'right',
    },
  ];

  return (
    <Card title={translate('Commission Report')}>
      <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }}>
        <Space>
          <Radio.Group value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
            <Radio.Button value="supplier">{translate('Group by Supplier')}</Radio.Button>
            <Radio.Button value="booking">{translate('Group by Booking')}</Radio.Button>
          </Radio.Group>
        </Space>
        <Space>
          <Select
            style={{ width: 300 }}
            placeholder={translate('Select Supplier (Optional)')}
            value={supplierId}
            onChange={setSupplierId}
            allowClear
            showSearch
            optionFilterProp="children"
          >
            {suppliersResult?.items?.map((supplier) => (
              <Select.Option key={supplier._id} value={supplier._id}>
                {supplier.supplierCode} - {supplier.name}
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
      </Space>

      {reportResult && reportResult.result && (
        <>
          {groupBy === 'supplier' && reportResult.result.summary && (
            <>
              <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title={translate('Total Suppliers')}
                      value={(reportResult.result.summary || []).length}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title={translate('Total Revenue')}
                      value={(reportResult.result.summary || []).reduce((sum, s) => sum + (s.totalRevenue || 0), 0)}
                      precision={2}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title={translate('Total Commission')}
                      value={(reportResult.result.summary || []).reduce((sum, s) => sum + (s.totalCommission || 0), 0)}
                      precision={2}
                      valueStyle={{ color: '#3f8600' }}
                    />
                  </Card>
                </Col>
              </Row>
              <Table
                columns={supplierColumns}
                dataSource={reportResult.result.summary || []}
                loading={isLoading}
                rowKey="supplierId"
                pagination={false}
              />
            </>
          )}

          {groupBy === 'booking' && reportResult.result && reportResult.result.summary && (
            <>
              <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title={translate('Total Bookings')}
                      value={reportResult.result.summary.totalBookings || 0}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title={translate('Total Revenue')}
                      value={reportResult.result.summary.totalRevenue || 0}
                      precision={2}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title={translate('Total Commission')}
                      value={reportResult.result.summary.totalCommission || 0}
                      precision={2}
                      valueStyle={{ color: '#3f8600' }}
                    />
                  </Card>
                </Col>
              </Row>
              <Table
                columns={bookingColumns}
                dataSource={reportResult.result.bookings || []}
                loading={isLoading}
                rowKey="bookingNumber"
                pagination={false}
              />
            </>
          )}
        </>
      )}
    </Card>
  );
}
