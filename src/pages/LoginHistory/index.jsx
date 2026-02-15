import dayjs from 'dayjs';
import { Tag } from 'antd';
import useLanguage from '@/locale/useLanguage';
import LoginHistoryDataTableModule from '@/modules/LoginHistoryModule/LoginHistoryDataTableModule';

export default function LoginHistory() {
  const translate = useLanguage();
  const entity = 'loginhistory';

  const dataTableColumns = [
    {
      title: translate('User'),
      dataIndex: ['user', 'name'],
    },
    {
      title: translate('Email'),
      dataIndex: 'email',
    },
    {
      title: translate('IP Address'),
      dataIndex: 'ipAddress',
    },
    {
      title: translate('Device'),
      dataIndex: 'device',
    },
    {
      title: translate('Login Time'),
      dataIndex: 'loginTime',
      render: (date) => (date ? dayjs(date).format('DD/MM/YYYY HH:mm') : ''),
    },
    {
      title: translate('Logout Time'),
      dataIndex: 'logoutTime',
      render: (date) => (date ? dayjs(date).format('DD/MM/YYYY HH:mm') : '-'),
    },
    {
      title: translate('Duration'),
      dataIndex: 'sessionDuration',
      render: (duration) => (duration ? `${duration} min` : '-'),
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
      render: (status) => {
        const colors = {
          success: 'green',
          failed: 'red',
          blocked: 'orange',
          expired: 'blue',
        };
        return <Tag color={colors[status]}>{translate(status)}</Tag>;
      },
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('Login History'),
    DATATABLE_TITLE: translate('Login History List'),
    ADD_NEW_ENTITY: '',
    ENTITY_NAME: translate('Login History'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    dataTableColumns,
  };

  return <LoginHistoryDataTableModule config={config} />;
}
