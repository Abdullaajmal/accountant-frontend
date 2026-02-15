import useLanguage from '@/locale/useLanguage';
import CompanyDataTableModule from '@/modules/CompanyModule/CompanyDataTableModule';

export default function Company() {
  const translate = useLanguage();
  const entity = 'company';

  const dataTableColumns = [
    {
      title: translate('Company Code'),
      dataIndex: 'companyCode',
    },
    {
      title: translate('Company Name'),
      dataIndex: 'companyName',
    },
    {
      title: translate('Legal Name'),
      dataIndex: 'legalName',
    },
    {
      title: translate('Tax ID'),
      dataIndex: 'taxId',
    },
    {
      title: translate('Currency'),
      dataIndex: 'currency',
    },
    {
      title: translate('Status'),
      dataIndex: 'isActive',
      render: (isActive) => (isActive ? translate('Active') : translate('Inactive')),
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('Companies'),
    DATATABLE_TITLE: translate('Company List'),
    ADD_NEW_ENTITY: translate('Add New Company'),
    ENTITY_NAME: translate('Company'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    dataTableColumns,
  };

  return <CompanyDataTableModule config={config} />;
}
