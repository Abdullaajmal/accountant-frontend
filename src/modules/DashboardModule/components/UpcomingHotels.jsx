import { Table, Tag } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import useLanguage from '@/locale/useLanguage';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';

export default function UpcomingHotels() {
  const translate = useLanguage();

  const fetchHotels = async () => {
    const response = await request.get({
      entity: 'booking/upcominghotels',
      options: { limit: 5 },
    });
    return response.success ? (response.result || []) : [];
  };

  const { result: hotels, isLoading } = useFetch(fetchHotels);

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return dayjs(date).format('DD MMM YYYY');
  };

  const columns = [
    {
      title: translate('Passenger'),
      key: 'passenger',
      render: (_, record) => record.paxName || record.client?.name || 'N/A',
    },
    {
      title: translate('Booking'),
      dataIndex: 'bookingNumber',
      key: 'bookingNumber',
      render: (text) => text || 'N/A',
    },
    {
      title: translate('Destination'),
      key: 'destination',
      render: (_, record) => record.package?.packageName || record.destination || 'N/A',
    },
    {
      title: translate('Check-in'),
      key: 'checkin',
      render: (_, record) => (
        <Tag color="green">{formatDate(record.travelDate)}</Tag>
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
        <HomeOutlined style={{ marginRight: 8 }} />
        {translate('Near By Hotel Check-in')}
      </h3>
      <Table
        columns={columns}
        dataSource={hotels || []}
        rowKey={(record) => record._id || Math.random()}
        pagination={false}
        loading={isLoading}
        scroll={{ x: true }}
        size="small"
      />
    </div>
  );
}
