import dayjs from 'dayjs';
import { Tag } from 'antd';
import useLanguage from '@/locale/useLanguage';
import PayrollDataTableModule from '@/modules/PayrollModule/PayrollDataTableModule';

export default function Payroll() {
  const translate = useLanguage();
  const entity = 'payroll';

  const dataTableColumns = [
    {
      title: translate('Employee'),
      dataIndex: ['employee', 'firstName'],
      render: (_, record) => `${record.employee?.firstName || ''} ${record.employee?.lastName || ''}`,
    },
    {
      title: translate('Period'),
      render: (_, record) => {
        const { month, year } = record.payrollPeriod || {};
        return month && year ? `${month}/${year}` : '-';
      },
    },
    {
      title: translate('Gross Salary'),
      dataIndex: ['salary', 'gross'],
      render: (amount) => amount?.toFixed(2) || '0.00',
    },
    {
      title: translate('Deductions'),
      dataIndex: ['deductions', 'total'],
      render: (amount) => amount?.toFixed(2) || '0.00',
    },
    {
      title: translate('Net Salary'),
      dataIndex: 'netSalary',
      render: (amount) => amount?.toFixed(2) || '0.00',
    },
    {
      title: translate('Payment Status'),
      dataIndex: 'paymentStatus',
      render: (status) => {
        const colors = {
          pending: 'orange',
          paid: 'green',
          partial: 'blue',
        };
        return <Tag color={colors[status]}>{translate(status)}</Tag>;
      },
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('Payroll'),
    DATATABLE_TITLE: translate('Payroll List'),
    ADD_NEW_ENTITY: translate('Generate Payroll'),
    ENTITY_NAME: translate('Payroll'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    dataTableColumns,
  };

  return <PayrollDataTableModule config={config} />;
}
