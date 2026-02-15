import UpdateItem from '@/modules/ErpPanelModule/UpdateItem';
import FinancialYearForm from '@/modules/FinancialYearModule/Forms/FinancialYearForm';

export default function FinancialYearUpdate() {
  return <UpdateItem config={{ entity: 'financialyear' }} UpdateForm={FinancialYearForm} />;
}
