import UpdateItem from '@/modules/ErpPanelModule/UpdateItem';
import RoleForm from '@/modules/RoleModule/Forms/RoleForm';

export default function RoleUpdate() {
  return <UpdateItem config={{ entity: 'role' }} UpdateForm={RoleForm} />;
}
