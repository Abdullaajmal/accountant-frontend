import ReadItem from '@/modules/ErpPanelModule/ReadItem';
import VisaPackageForm from '@/modules/VisaPackageModule/Forms/VisaPackageForm';
import useLanguage from '@/locale/useLanguage';

export default function VisaPackageRead() {
  const translate = useLanguage();
  const config = {
    entity: 'visapackage',
    ENTITY_NAME: translate('Visa Package'),
  };
  return <ReadItem config={config} UpdateForm={VisaPackageForm} />;
}
