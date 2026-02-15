import { Card } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function RevenueChart() {
  const translate = useLanguage();

  const fetchChartData = async () => {
    return await request.get({
      entity: 'journalentry/chartdata',
      options: { period: 'monthly' },
    });
  };

  const { result: chartResult, isLoading } = useFetch(fetchChartData);

  const data = chartResult?.result?.chartData || [];

  return (
    <Card title={translate('Revenue, Expense & Profit Trend')} style={{ marginTop: 16 }}>
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: 40 }}>Loading...</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#3f8600" name={translate('Income')} />
            <Line type="monotone" dataKey="expense" stroke="#cf1322" name={translate('Expenses')} />
            <Line type="monotone" dataKey="profit" stroke="#1890ff" name={translate('Profit')} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
