import useLanguage from '@/locale/useLanguage';
import UpdateAccountModule from '@/modules/AccountModule/UpdateAccountModule';

export default function AccountUpdate() {
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
  return <UpdateAccountModule config={configPage} />;
}
