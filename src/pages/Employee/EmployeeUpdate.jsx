import UpdateItem from '@/modules/ErpPanelModule/UpdateItem';
import EmployeeForm from '@/modules/EmployeeModule/Forms/EmployeeForm';

export default function EmployeeUpdate() {
  return <UpdateItem config={{ entity: 'employee' }} UpdateForm={EmployeeForm} />;
}
