import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import SupplierForm from '@/modules/SupplierModule/Forms/SupplierForm';

export default function CreateSupplierModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={SupplierForm} />
    </ErpLayout>
  );
}
