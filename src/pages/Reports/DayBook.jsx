import { useState } from 'react';
import { Card, DatePicker, Button, Table, Statistic, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import useLanguage from '@/locale/useLanguage';
import dayjs from 'dayjs';
import { ErpLayout } from '@/layout';

export default function DayBook() {
  const translate = useLanguage();
  const dispatch = useDispatch();
  const [date, setDate] = useState(dayjs());
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await dispatch(
        erp.list({
          entity: 'reports',
          action: 'daybook',
          params: {
            date: date.format('YYYY-MM-DD'),
          },
        })
      );
      if (result?.payload?.success) {
        setData(result.payload.result);
      }
    } catch (error) {
      console.error('Error generating day book:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: translate('Time'),
      dataIndex: 'date',
      render: (date) => (date ? dayjs(date).format('HH:mm') : ''),
    },
    {
      title: translate('Description'),
      dataIndex: 'description',
    },
    {
      title: translate('Reference'),
      dataIndex: 'reference',
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
      dataIndex: 'runningBalance',
      render: (balance) => balance?.toFixed(2) || '0.00',
    },
  ];

  return (
    <ErpLayout>
      <Card>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <DatePicker
              value={date}
              onChange={setDate}
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
                <Statistic title={translate('Total Debit')} value={data.summary?.totalDebit || 0} precision={2} />
              </Col>
              <Col span={8}>
                <Statistic title={translate('Total Credit')} value={data.summary?.totalCredit || 0} precision={2} />
              </Col>
              <Col span={8}>
                <Statistic
                  title={translate('Balance')}
                  value={data.summary?.balance || 0}
                  precision={2}
                  valueStyle={{ color: data.summary?.balance >= 0 ? '#3f8600' : '#cf1322' }}
                />
              </Col>
            </Row>

            <Table columns={columns} dataSource={data.transactions || []} pagination={{ pageSize: 50 }} />
          </>
        )}
      </Card>
    </ErpLayout>
  );
}
