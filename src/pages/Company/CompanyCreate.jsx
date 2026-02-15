import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import CompanyForm from '@/modules/CompanyModule/Forms/CompanyForm';

export default function CompanyCreate() {
  return <CreateItem config={{ entity: 'company' }} CreateForm={CompanyForm} />;
}
