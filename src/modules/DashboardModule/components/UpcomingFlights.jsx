import { Table, Tag, Spin } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import useLanguage from '@/locale/useLanguage';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';

export default function UpcomingFlights({ type = 'departure' }) {
  const translate = useLanguage();
  const navigate = useNavigate();

  const fetchFlights = async () => {
    const response = await request.get({
      entity: 'booking/upcomingflights',
      options: { limit: 5 },
    });
    if (response.success && response.result) {
      return type === 'departure' 
        ? response.result.departureFlights || []
        : response.result.returnFlights || [];
    }
    return [];
  };

  const { result: flights, isLoading } = useFetch(fetchFlights);

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return dayjs(date).format('DD MMM YYYY');
  };

  const columns = [
    {
      title: translate('Airline'),
      dataIndex: 'airline',
      key: 'airline',
      render: (text) => text || 'N/A',
    },
    {
      title: translate('Passenger'),
      key: 'passenger',
      render: (_, record) => record.paxName || record.client?.name || 'N/A',
    },
    {
      title: translate('Sector'),
      key: 'sector',
      render: (_, record) => `${record.sectorType || 'INTERNATIONAL'} ${record.pnr || ''}`,
    },
    {
      title: translate('Date'),
      key: 'date',
      render: (_, record) => (
        <Tag color="blue">
          {formatDate(record.travelDateTime || record.returnDateTime)}
        </Tag>
      ),
    },
  ];

  return (
    <div className="whiteBox shadow pad20" style={{ height: '100%' }}>
      <h3
        style={{
          color: '#22075e',
          fontSize: 'large',
          marginBottom: 5,
          padding: '0 20px 20px',
        }}
      >
        <SendOutlined style={{ marginRight: 8 }} />
        {type === 'departure' 
          ? translate('Upcoming Departure Flights')
          : translate('Upcoming Return Flights')}
      </h3>
      <Table
        columns={columns}
        dataSource={flights || []}
        rowKey={(record) => record._id || Math.random()}
        pagination={false}
        loading={isLoading}
        scroll={{ x: true }}
        size="small"
      />
    </div>
  );
}
