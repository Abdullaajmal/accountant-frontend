import useLanguage from '@/locale/useLanguage';
import { useMoney } from '@/settings';
import BankAccountDataTableModule from '@/modules/BankAccountModule/BankAccountDataTableModule';

export default function BankAccount() {
  const translate = useLanguage();
  const { moneyFormatter } = useMoney();
  const entity = 'bankAccount';

  const dataTableColumns = [
    {
      title: translate('Account Name'),
      dataIndex: 'accountName',
    },
    {
      title: translate('Account Number'),
      dataIndex: 'accountNumber',
    },
    {
      title: translate('Bank Name'),
      dataIndex: 'bankName',
    },
    {
      title: translate('Branch'),
      dataIndex: 'branch',
    },
    {
      title: translate('Account Type'),
      dataIndex: 'accountType',
    },
    {
      title: translate('Currency'),
      dataIndex: 'currency',
    },
    {
      title: translate('Current Balance'),
      dataIndex: 'currentBalance',
      render: (balance, record) => moneyFormatter({ amount: balance || 0, currency_code: record.currency || 'USD' }),
    },
    {
      title: translate('Default'),
      dataIndex: 'isDefault',
      render: (isDefault) => (isDefault ? translate('Yes') : translate('No')),
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('Bank Accounts'),
    DATATABLE_TITLE: translate('Bank Account List'),
    ADD_NEW_ENTITY: translate('Add New Bank Account'),
    ENTITY_NAME: translate('Bank Account'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    dataTableColumns,
  };

  return <BankAccountDataTableModule config={config} />;
}
