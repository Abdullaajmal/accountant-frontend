import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import PackageForm from '@/modules/PackageModule/Forms/PackageForm';

export default function CreatePackageModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={PackageForm} />
    </ErpLayout>
  );
}
