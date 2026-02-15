import useLanguage from '@/locale/useLanguage';
import CreateAccountModule from '@/modules/AccountModule/CreateAccountModule';

export default function AccountCreate() {
  const entity = 'account';
  const translate = useLanguage();
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
  return <CreateAccountModule config={configPage} />;
}
