import ReadItem from '@/modules/ErpPanelModule/ReadItem';
import RoleForm from '@/modules/RoleModule/Forms/RoleForm';

export default function RoleRead() {
  return <ReadItem config={{ entity: 'role', ENTITY_NAME: 'Role' }} UpdateForm={RoleForm} />;
}
