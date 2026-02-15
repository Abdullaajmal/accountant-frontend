import useLanguage from '@/locale/useLanguage';
import CreateJournalEntryModule from '@/modules/JournalEntryModule/CreateJournalEntryModule';

export default function JournalEntryCreate() {
  const entity = 'journalentry';
  const translate = useLanguage();
  const Labels = {
    PANEL_TITLE: translate('Journal Entries'),
    DATATABLE_TITLE: translate('Journal Entry List'),
    ADD_NEW_ENTITY: translate('Add New Journal Entry'),
    ENTITY_NAME: translate('Journal Entry'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <CreateJournalEntryModule config={configPage} />;
}
