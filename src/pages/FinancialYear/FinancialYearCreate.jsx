import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import FinancialYearForm from '@/modules/FinancialYearModule/Forms/FinancialYearForm';

export default function FinancialYearCreate() {
  return <CreateItem config={{ entity: 'financialyear' }} CreateForm={FinancialYearForm} />;
}
