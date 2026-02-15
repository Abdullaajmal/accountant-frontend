import dayjs from 'dayjs';
import { Tag } from 'antd';
import useLanguage from '@/locale/useLanguage';
import FinancialYearDataTableModule from '@/modules/FinancialYearModule/FinancialYearDataTableModule';

export default function FinancialYear() {
  const translate = useLanguage();
  const entity = 'financialyear';

  const dataTableColumns = [
    {
      title: translate('Year Name'),
      dataIndex: 'yearName',
    },
    {
      title: translate('Start Date'),
      dataIndex: 'startDate',
      render: (date) => (date ? dayjs(date).format('DD/MM/YYYY') : ''),
    },
    {
      title: translate('End Date'),
      dataIndex: 'endDate',
      render: (date) => (date ? dayjs(date).format('DD/MM/YYYY') : ''),
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
      render: (status) => {
        const colors = {
          draft: 'default',
          open: 'green',
          closed: 'red',
          locked: 'orange',
        };
        return <Tag color={colors[status]}>{translate(status)}</Tag>;
      },
    },
    {
      title: translate('Current'),
      dataIndex: 'isCurrent',
      render: (isCurrent) => (isCurrent ? <Tag color="blue">{translate('Yes')}</Tag> : ''),
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('Financial Years'),
    DATATABLE_TITLE: translate('Financial Year List'),
    ADD_NEW_ENTITY: translate('Add New Financial Year'),
    ENTITY_NAME: translate('Financial Year'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    dataTableColumns,
  };

  return <FinancialYearDataTableModule config={config} />;
}
