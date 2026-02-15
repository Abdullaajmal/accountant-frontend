import { Select, Tag } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentAdmin } from '@/redux/auth/selectors';
import { switchRole } from '@/redux/auth/actions';
import useLanguage from '@/locale/useLanguage';
import { message } from 'antd';

export default function RoleSwitcher() {
  const translate = useLanguage();
  const dispatch = useDispatch();
  const currentAdmin = useSelector(selectCurrentAdmin);

  if (!currentAdmin?.availableRoles || currentAdmin.availableRoles.length <= 1) {
    return null;
  }

  const handleRoleChange = async (roleId) => {
    try {
      await dispatch(switchRole({ roleId }));
      message.success(translate('Role switched successfully'));
      // Reload page to apply new role permissions
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      message.error(translate('Failed to switch role'));
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Select
        style={{ width: 150 }}
        value={currentAdmin.role || 'default'}
        onChange={handleRoleChange}
        suffixIcon={<SwapOutlined />}
        placeholder={translate('Select Role')}
      >
        {currentAdmin.availableRoles.map((role) => (
          <Select.Option key={role._id || 'default'} value={role._id || null}>
            {role.roleName || translate('Default')}
          </Select.Option>
        ))}
      </Select>
      <Tag color="blue">
        {translate('Current')}: {currentAdmin.roleName || translate('Default')}
      </Tag>
    </div>
  );
}
