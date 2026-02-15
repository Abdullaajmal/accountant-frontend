import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import EmployeeForm from '@/modules/EmployeeModule/Forms/EmployeeForm';

export default function EmployeeCreate() {
  return <CreateItem config={{ entity: 'employee' }} CreateForm={EmployeeForm} />;
}
