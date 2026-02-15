import UpdateItem from '@/modules/ErpPanelModule/UpdateItem';
import CompanyForm from '@/modules/CompanyModule/Forms/CompanyForm';

export default function CompanyUpdate() {
  return <UpdateItem config={{ entity: 'company' }} UpdateForm={CompanyForm} />;
}
