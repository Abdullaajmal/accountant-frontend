import UpdateItem from '@/modules/ErpPanelModule/UpdateItem';
import VisaPackageForm from '@/modules/VisaPackageModule/Forms/VisaPackageForm';

export default function VisaPackageUpdate() {
  return <UpdateItem config={{ entity: 'visapackage' }} UpdateForm={VisaPackageForm} />;
}
