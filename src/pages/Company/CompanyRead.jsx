import ReadItem from '@/modules/ErpPanelModule/ReadItem';
import CompanyForm from '@/modules/CompanyModule/Forms/CompanyForm';
import useLanguage from '@/locale/useLanguage';

export default function CompanyRead() {
  const translate = useLanguage();
  const config = {
    entity: 'company',
    ENTITY_NAME: translate('Company'),
  };
  return <ReadItem config={config} UpdateForm={CompanyForm} />;
}
