import { Tag } from 'antd';
import useLanguage from '@/locale/useLanguage';
import RoleDataTableModule from '@/modules/RoleModule/RoleDataTableModule';

export default function Role() {
  const translate = useLanguage();
  const entity = 'role';

  const dataTableColumns = [
    {
      title: translate('Role Code'),
      dataIndex: 'roleCode',
    },
    {
      title: translate('Role Name'),
      dataIndex: 'roleName',
    },
    {
      title: translate('Description'),
      dataIndex: 'description',
    },
    {
      title: translate('Status'),
      dataIndex: 'enabled',
      render: (enabled) => (
        <Tag color={enabled ? 'green' : 'red'}>{enabled ? translate('Active') : translate('Inactive')}</Tag>
      ),
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('Roles'),
    DATATABLE_TITLE: translate('Role List'),
    ADD_NEW_ENTITY: translate('Add New Role'),
    ENTITY_NAME: translate('Role'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    dataTableColumns,
  };

  return <RoleDataTableModule config={config} />;
}
