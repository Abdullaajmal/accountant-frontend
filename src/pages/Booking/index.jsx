import dayjs from 'dayjs';
import { Tag } from 'antd';
import useLanguage from '@/locale/useLanguage';
import BookingDataTableModule from '@/modules/BookingModule/BookingDataTableModule';

export default function Booking() {
  const translate = useLanguage();
  const entity = 'booking';

  const dataTableColumns = [
    {
      title: translate('Booking Number'),
      dataIndex: 'bookingNumber',
    },
    {
      title: translate('Customer'),
      dataIndex: ['client', 'name'],
    },
    {
      title: translate('Booking Type'),
      dataIndex: 'bookingType',
      render: (type) => {
        const colors = {
          flight: 'blue',
          hotel: 'green',
          car: 'orange',
          package: 'purple',
          combined: 'cyan',
        };
        return <Tag color={colors[type] || 'default'}>{translate(type || 'flight')}</Tag>;
      },
    },
    {
      title: translate('Travel Date'),
      dataIndex: 'travelDate',
      render: (date) => (date ? dayjs(date).format('DD/MM/YYYY') : ''),
    },
    {
      title: translate('Total'),
      dataIndex: 'total',
      render: (amount) => (amount ? amount.toFixed(2) : '0.00'),
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
    {
      title: translate('Payment Status'),
      dataIndex: 'paymentStatus',
      render: (status) => {
        const colors = {
          unpaid: 'red',
          paid: 'green',
          partially: 'orange',
          refunded: 'default',
        };
        return <Tag color={colors[status]}>{translate(status)}</Tag>;
      },
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('Bookings'),
    DATATABLE_TITLE: translate('Booking List'),
    ADD_NEW_ENTITY: translate('Add New Booking'),
    ENTITY_NAME: translate('Booking'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    dataTableColumns,
  };

  return <BookingDataTableModule config={config} />;
}
