import useLanguage from '@/locale/useLanguage';
import UpdateBankAccountModule from '@/modules/BankAccountModule/UpdateBankAccountModule';

export default function BankAccountUpdate() {
  const entity = 'bankAccount';
  const translate = useLanguage();
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
  return <UpdateBankAccountModule config={configPage} />;
}
