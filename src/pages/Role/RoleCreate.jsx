import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import RoleForm from '@/modules/RoleModule/Forms/RoleForm';

export default function RoleCreate() {
  return <CreateItem config={{ entity: 'role' }} CreateForm={RoleForm} />;
}
