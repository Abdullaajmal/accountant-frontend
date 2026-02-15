import ReadItem from '@/modules/ErpPanelModule/ReadItem';
import FinancialYearForm from '@/modules/FinancialYearModule/Forms/FinancialYearForm';
import useLanguage from '@/locale/useLanguage';

export default function FinancialYearRead() {
  const translate = useLanguage();
  const config = {
    entity: 'financialyear',
    ENTITY_NAME: translate('Financial Year'),
  };
  return <ReadItem config={config} UpdateForm={FinancialYearForm} />;
}
