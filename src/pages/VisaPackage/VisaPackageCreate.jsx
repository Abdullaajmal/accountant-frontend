import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import VisaPackageForm from '@/modules/VisaPackageModule/Forms/VisaPackageForm';

export default function VisaPackageCreate() {
  return <CreateItem config={{ entity: 'visapackage' }} CreateForm={VisaPackageForm} />;
}
