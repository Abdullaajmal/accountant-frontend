import dayjs from 'dayjs';
import { Tag, Button } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import AttendanceDataTableModule from '@/modules/AttendanceModule/AttendanceDataTableModule';

export default function Attendance() {
  const translate = useLanguage();
  const dispatch = useDispatch();
  const entity = 'attendance';

  const handleCheckIn = () => {
    // This will be handled by the module
  };

  const handleCheckOut = () => {
    // This will be handled by the module
  };

  const dataTableColumns = [
    {
      title: translate('Employee'),
      dataIndex: ['employee', 'firstName'],
      render: (_, record) => `${record.employee?.firstName || ''} ${record.employee?.lastName || ''}`,
    },
    {
      title: translate('Date'),
      dataIndex: 'date',
      render: (date) => (date ? dayjs(date).format('DD/MM/YYYY') : ''),
    },
    {
      title: translate('Check In'),
      dataIndex: ['checkIn', 'time'],
      render: (time) => (time ? dayjs(time).format('HH:mm') : '-'),
    },
    {
      title: translate('Check Out'),
      dataIndex: ['checkOut', 'time'],
      render: (time) => (time ? dayjs(time).format('HH:mm') : '-'),
    },
    {
      title: translate('Work Hours'),
      dataIndex: 'workHours',
      render: (hours) => hours?.toFixed(2) || '0.00',
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
      render: (status) => {
        const colors = {
          present: 'green',
          absent: 'red',
          'half-day': 'orange',
          leave: 'blue',
          holiday: 'purple',
          late: 'orange',
        };
        return <Tag color={colors[status]}>{translate(status)}</Tag>;
      },
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('Attendance'),
    DATATABLE_TITLE: translate('Attendance List'),
    ADD_NEW_ENTITY: translate('Add Attendance'),
    ENTITY_NAME: translate('Attendance'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    dataTableColumns,
  };

  return <AttendanceDataTableModule config={config} />;
}
