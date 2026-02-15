import useLanguage from '@/locale/useLanguage';
import SupplierDataTableModule from '@/modules/SupplierModule/SupplierDataTableModule';

export default function Supplier() {
  const translate = useLanguage();
  const entity = 'supplier';

  const dataTableColumns = [
    {
      title: translate('Supplier Code'),
      dataIndex: 'supplierCode',
    },
    {
      title: translate('Name'),
      dataIndex: 'name',
    },
    {
      title: translate('Supplier Type'),
      dataIndex: 'supplierType',
    },
    {
      title: translate('Contact Person'),
      dataIndex: 'contactPerson',
    },
    {
      title: translate('Phone'),
      dataIndex: 'phone',
    },
    {
      title: translate('Email'),
      dataIndex: 'email',
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('Suppliers'),
    DATATABLE_TITLE: translate('Supplier List'),
    ADD_NEW_ENTITY: translate('Add New Supplier'),
    ENTITY_NAME: translate('Supplier'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    dataTableColumns,
  };

  return <SupplierDataTableModule config={config} />;
}
