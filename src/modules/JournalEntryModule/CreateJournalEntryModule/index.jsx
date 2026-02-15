import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import JournalEntryForm from '@/modules/JournalEntryModule/Forms/JournalEntryForm';

export default function CreateJournalEntryModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={JournalEntryForm} />
    </ErpLayout>
  );
}
