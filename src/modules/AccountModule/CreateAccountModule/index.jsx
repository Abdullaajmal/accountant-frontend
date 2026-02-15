import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import AccountForm from '@/modules/AccountModule/Forms/AccountForm';

export default function CreateAccountModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={AccountForm} />
    </ErpLayout>
  );
}
