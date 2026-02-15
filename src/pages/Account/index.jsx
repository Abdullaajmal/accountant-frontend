import useLanguage from '@/locale/useLanguage';
import AccountDataTableModule from '@/modules/AccountModule/AccountDataTableModule';

export default function Account() {
  const translate = useLanguage();
  const entity = 'account';

  const dataTableColumns = [
    {
      title: translate('Account Code'),
      dataIndex: 'accountCode',
    },
    {
      title: translate('Account Name'),
      dataIndex: 'accountName',
    },
    {
      title: translate('Account Type'),
      dataIndex: 'accountType',
    },
    {
      title: translate('Current Balance'),
      dataIndex: 'currentBalance',
      render: (balance) => balance?.toFixed(2) || '0.00',
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('Chart of Accounts'),
    DATATABLE_TITLE: translate('Account List'),
    ADD_NEW_ENTITY: translate('Add New Account'),
    ENTITY_NAME: translate('Account'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    dataTableColumns,
  };

  return <AccountDataTableModule config={config} />;
}
