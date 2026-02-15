import ReadItem from '@/modules/ErpPanelModule/ReadItem';
import EmployeeForm from '@/modules/EmployeeModule/Forms/EmployeeForm';
import useLanguage from '@/locale/useLanguage';

export default function EmployeeRead() {
  const translate = useLanguage();
  const config = {
    entity: 'employee',
    ENTITY_NAME: translate('Employee'),
  };
  return <ReadItem config={config} UpdateForm={EmployeeForm} />;
}
