import dayjs from 'dayjs';
import useLanguage from '@/locale/useLanguage';
import { useDate } from '@/settings';
import JournalEntryDataTableModule from '@/modules/JournalEntryModule/JournalEntryDataTableModule';

export default function JournalEntry() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const entity = 'journalentry';

  const dataTableColumns = [
    {
      title: translate('Entry Number'),
      dataIndex: 'entryNumber',
    },
    {
      title: translate('Date'),
      dataIndex: 'date',
      render: (date) => dayjs(date).format(dateFormat),
    },
    {
      title: translate('Reference'),
      dataIndex: 'reference',
    },
    {
      title: translate('Total Debit'),
      dataIndex: 'totalDebit',
      render: (amount) => amount?.toFixed(2) || '0.00',
    },
    {
      title: translate('Total Credit'),
      dataIndex: 'totalCredit',
      render: (amount) => amount?.toFixed(2) || '0.00',
    },
    {
      title: translate('Posted'),
      dataIndex: 'isPosted',
      render: (isPosted) => (isPosted ? 'Yes' : 'No'),
    },
  ];

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

  const config = {
    ...configPage,
    dataTableColumns,
  };

  return <JournalEntryDataTableModule config={config} />;
}
