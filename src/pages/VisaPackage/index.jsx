import { Tag } from 'antd';
import useLanguage from '@/locale/useLanguage';
import VisaPackageDataTableModule from '@/modules/VisaPackageModule/VisaPackageDataTableModule';

export default function VisaPackage() {
  const translate = useLanguage();
  const entity = 'visapackage';

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
      dataIndex: ['destination', 'country'],
    },
    {
      title: translate('Visa Type'),
      dataIndex: 'visaType',
    },
    {
      title: translate('Total Cost'),
      dataIndex: ['cost', 'total'],
      render: (amount) => amount?.toFixed(2) || '0.00',
    },
    {
      title: translate('Profit'),
      dataIndex: 'profit',
      render: (amount) => amount?.toFixed(2) || '0.00',
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
      render: (status) => {
        const colors = {
          active: 'green',
          inactive: 'red',
          discontinued: 'orange',
        };
        return <Tag color={colors[status]}>{translate(status)}</Tag>;
      },
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('Visa Packages'),
    DATATABLE_TITLE: translate('Visa Package List'),
    ADD_NEW_ENTITY: translate('Add New Visa Package'),
    ENTITY_NAME: translate('Visa Package'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    dataTableColumns,
  };

  return <VisaPackageDataTableModule config={config} />;
}
