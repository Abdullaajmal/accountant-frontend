import useLanguage from '@/locale/useLanguage';
import ReadAccountModule from '@/modules/AccountModule/ReadAccountModule';

export default function AccountRead() {
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
  return <ReadAccountModule config={configPage} />;
}
