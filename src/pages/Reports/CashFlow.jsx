import { useState } from 'react';
import { Card, DatePicker, Button, Table, Statistic, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import useLanguage from '@/locale/useLanguage';
import dayjs from 'dayjs';
import { ErpLayout } from '@/layout';

const { RangePicker } = DatePicker;

export default function CashFlow() {
  const translate = useLanguage();
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState([dayjs().startOf('month'), dayjs().endOf('month')]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await dispatch(
        erp.list({
          entity: 'reports',
          action: 'cashflow',
          params: {
            startDate: dateRange[0].format('YYYY-MM-DD'),
            endDate: dateRange[1].format('YYYY-MM-DD'),
          },
        })
      );
      if (result?.payload?.success) {
        setData(result.payload.result);
      }
    } catch (error) {
      console.error('Error generating cash flow:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: translate('Date'),
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: translate('Cash In'),
      dataIndex: 'in',
      key: 'in',
      render: (amount) => amount?.toFixed(2) || '0.00',
    },
    {
      title: translate('Cash Out'),
      dataIndex: 'out',
      key: 'out',
      render: (amount) => amount?.toFixed(2) || '0.00',
    },
    {
      title: translate('Net Flow'),
      key: 'net',
      render: (_, record) => ((record.in || 0) - (record.out || 0)).toFixed(2),
    },
  ];

  return (
    <ErpLayout>
      <Card>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <RangePicker
              value={dateRange}
              onChange={setDateRange}
              format="DD/MM/YYYY"
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={12}>
            <Button type="primary" onClick={handleGenerate} loading={loading}>
              {translate('Generate Report')}
            </Button>
          </Col>
        </Row>

        {data && (
          <>
            <Row gutter={16} style={{ marginBottom: 16 }}>
              <Col span={8}>
                <Statistic
                  title={translate('Total Cash In')}
                  value={data.summary?.totalCashIn || 0}
                  precision={2}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title={translate('Total Cash Out')}
                  value={data.summary?.totalCashOut || 0}
                  precision={2}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title={translate('Net Cash Flow')}
                  value={data.summary?.netCashFlow || 0}
                  precision={2}
                  valueStyle={{ color: data.summary?.netCashFlow >= 0 ? '#3f8600' : '#cf1322' }}
                />
              </Col>
            </Row>

            <Table
              columns={columns}
              dataSource={Object.entries(data.dailyFlow || {}).map(([date, flow]) => ({
                key: date,
                date,
                ...flow,
              }))}
              pagination={false}
            />
          </>
        )}
      </Card>
    </ErpLayout>
  );
}
