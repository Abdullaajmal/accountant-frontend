import dayjs from 'dayjs';
import { Tag } from 'antd';
import useLanguage from '@/locale/useLanguage';
import CommissionDataTableModule from '@/modules/CommissionModule/CommissionDataTableModule';

export default function Commission() {
  const translate = useLanguage();
  const entity = 'commission';

  const dataTableColumns = [
    {
      title: translate('Commission Code'),
      dataIndex: 'commissionCode',
    },
    {
      title: translate('Name'),
      dataIndex: 'name',
    },
    {
      title: translate('Type'),
      dataIndex: 'type',
    },
    {
      title: translate('Structure'),
      dataIndex: ['commissionStructure', 'type'],
    },
    {
      title: translate('Rate'),
      dataIndex: ['commissionStructure', 'rate'],
      render: (rate, record) => {
        const type = record.commissionStructure?.type;
        return type === 'percentage' ? `${rate}%` : rate;
      },
    },
    {
      title: translate('Status'),
      dataIndex: 'isActive',
      render: (isActive) => (
        <Tag color={isActive ? 'green' : 'red'}>{isActive ? translate('Active') : translate('Inactive')}</Tag>
      ),
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('Commissions'),
    DATATABLE_TITLE: translate('Commission List'),
    ADD_NEW_ENTITY: translate('Add New Commission'),
    ENTITY_NAME: translate('Commission'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    dataTableColumns,
  };

  return <CommissionDataTableModule config={config} />;
}
