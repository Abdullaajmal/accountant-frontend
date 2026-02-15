import dayjs from 'dayjs';
import { Tag } from 'antd';
import useLanguage from '@/locale/useLanguage';
import HotelBookingDataTableModule from '@/modules/HotelBookingModule/HotelBookingDataTableModule';

export default function HotelBooking() {
  const translate = useLanguage();
  const entity = 'hotelbooking';

  const dataTableColumns = [
    {
      title: translate('Booking Number'),
      dataIndex: 'bookingNumber',
    },
    {
      title: translate('Client'),
      dataIndex: ['client', 'name'],
    },
    {
      title: translate('Hotel Name'),
      dataIndex: 'hotelName',
    },
    {
      title: translate('Check In'),
      dataIndex: 'checkIn',
      render: (date) => (date ? dayjs(date).format('DD/MM/YYYY') : ''),
    },
    {
      title: translate('Check Out'),
      dataIndex: 'checkOut',
      render: (date) => (date ? dayjs(date).format('DD/MM/YYYY') : ''),
    },
    {
      title: translate('Total Cost'),
      dataIndex: ['cost', 'total'],
      render: (amount) => amount?.toFixed(2) || '0.00',
    },
    {
      title: translate('Booking Status'),
      dataIndex: 'bookingStatus',
      render: (status) => {
        const colors = {
          pending: 'orange',
          confirmed: 'green',
          cancelled: 'red',
          completed: 'blue',
        };
        return <Tag color={colors[status]}>{translate(status)}</Tag>;
      },
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('Hotel Bookings'),
    DATATABLE_TITLE: translate('Hotel Booking List'),
    ADD_NEW_ENTITY: translate('Add New Hotel Booking'),
    ENTITY_NAME: translate('Hotel Booking'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    dataTableColumns,
  };

  return <HotelBookingDataTableModule config={config} />;
}
