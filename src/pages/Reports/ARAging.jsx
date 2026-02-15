import { useState } from 'react';
import { Card, DatePicker, Button, Table, Statistic, Row, Col, Tag } from 'antd';
import { useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import useLanguage from '@/locale/useLanguage';
import dayjs from 'dayjs';
import { ErpLayout } from '@/layout';

export default function ARAging() {
  const translate = useLanguage();
  const dispatch = useDispatch();
  const [asOfDate, setAsOfDate] = useState(dayjs());
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await dispatch(
        erp.list({
          entity: 'reports',
          action: 'araging',
          params: {
            asOfDate: asOfDate.format('YYYY-MM-DD'),
          },
        })
      );
      if (result?.payload?.success) {
        setData(result.payload.result);
      }
    } catch (error) {
      console.error('Error generating AR Aging:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: translate('Invoice Number'),
      dataIndex: 'number',
    },
    {
      title: translate('Client'),
      dataIndex: ['client', 'name'],
    },
    {
      title: translate('Date'),
      dataIndex: 'date',
      render: (date) => (date ? dayjs(date).format('DD/MM/YYYY') : ''),
    },
    {
      title: translate('Outstanding'),
      dataIndex: 'outstanding',
      render: (amount) => amount?.toFixed(2) || '0.00',
    },
    {
      title: translate('Days Past Due'),
      dataIndex: 'daysPastDue',
      render: (days) => <Tag color={days > 90 ? 'red' : days > 60 ? 'orange' : 'blue'}>{days}</Tag>,
    },
  ];

  return (
    <ErpLayout>
      <Card>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <DatePicker
              value={asOfDate}
              onChange={setAsOfDate}
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
              <Col span={6}>
                <Statistic title={translate('Current (0-30)')} value={data.summary?.current || 0} precision={2} />
              </Col>
              <Col span={6}>
                <Statistic title={translate('31-60 Days')} value={data.summary?.days30 || 0} precision={2} />
              </Col>
              <Col span={6}>
                <Statistic title={translate('61-90 Days')} value={data.summary?.days60 || 0} precision={2} />
              </Col>
              <Col span={6}>
                <Statistic title={translate('Over 90 Days')} value={data.summary?.over120 || 0} precision={2} />
              </Col>
            </Row>

            <Table
              columns={columns}
              dataSource={[
                ...(data.aging?.current || []),
                ...(data.aging?.days30 || []),
                ...(data.aging?.days60 || []),
                ...(data.aging?.days90 || []),
                ...(data.aging?.over120 || []),
              ]}
              pagination={{ pageSize: 20 }}
            />
          </>
        )}
      </Card>
    </ErpLayout>
  );
}
