import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import BankAccountForm from '@/modules/BankAccountModule/Forms/BankAccountForm';

export default function CreateBankAccountModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={BankAccountForm} />
    </ErpLayout>
  );
}
