import useLanguage from '@/locale/useLanguage';
import { useMoney } from '@/settings';
import PackageDataTableModule from '@/modules/PackageModule/PackageDataTableModule';

export default function Package() {
  const translate = useLanguage();
  const { moneyFormatter } = useMoney();
  const entity = 'package';

  const dataTableColumns = [
    {
      title: translate('Package Code'),
      dataIndex: 'packageCode',
    },
    {
      title: translate('Package Name'),
      dataIndex: 'packageName',
    },
    {
      title: translate('Destination'),
      dataIndex: 'destination',
    },
    {
      title: translate('Duration'),
      dataIndex: 'duration',
    },
    {
      title: translate('Price'),
      dataIndex: 'price',
      render: (price, record) => moneyFormatter({ amount: price, currency_code: record.currency }),
    },
    {
      title: translate('Active'),
      dataIndex: 'isActive',
      render: (isActive) => (isActive ? 'Yes' : 'No'),
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('Travel Packages'),
    DATATABLE_TITLE: translate('Package List'),
    ADD_NEW_ENTITY: translate('Add New Package'),
    ENTITY_NAME: translate('Package'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    dataTableColumns,
  };

  return <PackageDataTableModule config={config} />;
}
