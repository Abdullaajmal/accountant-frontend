import dayjs from 'dayjs';
import useLanguage from '@/locale/useLanguage';
import EmployeeDataTableModule from '@/modules/EmployeeModule/EmployeeDataTableModule';

export default function Employee() {
  const translate = useLanguage();
  const entity = 'employee';

  const dataTableColumns = [
    {
      title: translate('Employee ID'),
      dataIndex: 'employeeId',
    },
    {
      title: translate('Name'),
      render: (_, record) => `${record.firstName || ''} ${record.lastName || ''}`,
    },
    {
      title: translate('Email'),
      dataIndex: 'email',
    },
    {
      title: translate('Phone'),
      dataIndex: 'phone',
    },
    {
      title: translate('Designation'),
      dataIndex: 'designation',
    },
    {
      title: translate('Department'),
      dataIndex: 'department',
    },
    {
      title: translate('Date of Joining'),
      dataIndex: 'dateOfJoining',
      render: (date) => (date ? dayjs(date).format('DD/MM/YYYY') : ''),
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('Employees'),
    DATATABLE_TITLE: translate('Employee List'),
    ADD_NEW_ENTITY: translate('Add New Employee'),
    ENTITY_NAME: translate('Employee'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    dataTableColumns,
  };

  return <EmployeeDataTableModule config={config} />;
}
