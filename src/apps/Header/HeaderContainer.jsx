import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Dropdown, Layout, Badge, Button, Select, Tag } from 'antd';

// import Notifications from '@/components/Notification';

import { LogoutOutlined, ToolOutlined, UserOutlined, SwapOutlined } from '@ant-design/icons';

import { selectCurrentAdmin } from '@/redux/auth/selectors';

import { FILE_BASE_URL } from '@/config/serverApiConfig';

import useLanguage from '@/locale/useLanguage';
import { useAppContext } from '@/context/appContext';
import UpgradeButton from './UpgradeButton';
import headerLogo from '@/header-logo.png';
import { switchRole } from '@/redux/auth/actions';
import { switchRole as switchRoleService } from '@/auth/auth.service';
import { message } from 'antd';

export default function HeaderContent() {
  const currentAdmin = useSelector(selectCurrentAdmin);
  const dispatch = useDispatch();
  const { Header } = Layout;

  const translate = useLanguage();
  const { state } = useAppContext();
  const showUpgradeButton = state.currentApp === 'default';

  const handleRoleSwitch = async (roleId) => {
    try {
      const response = await switchRoleService({ roleId });
      if (response.success) {
        // Update auth state
        const auth_state = {
          current: response.result,
          isLoggedIn: true,
          isLoading: false,
          isSuccess: true,
        };
        window.localStorage.setItem('auth', JSON.stringify(auth_state));
        window.localStorage.setItem('token', response.result.token);
        
        dispatch({
          type: 'REQUEST_SUCCESS',
          payload: response.result,
        });
        
        message.success(translate('Role switched successfully'));
        window.location.reload(); // Reload to apply new role
      } else {
        message.error(response.message || translate('Failed to switch role'));
      }
    } catch (error) {
      message.error(translate('Failed to switch role'));
    }
  };

  const ProfileDropdown = () => {
    const navigate = useNavigate();
    return (
      <div className="profileDropdown" onClick={() => navigate('/profile')}>
        <Avatar
          size="large"
          className="last"
          src={currentAdmin?.photo ? FILE_BASE_URL + currentAdmin?.photo : undefined}
          style={{
            color: '#f56a00',
            backgroundColor: currentAdmin?.photo ? 'none' : '#fde3cf',
            boxShadow: 'rgba(150, 190, 238, 0.35) 0px 0px 6px 1px',
          }}
        >
          {currentAdmin?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
        <div className="profileDropdownInfo">
          <p>
            {currentAdmin?.name} {currentAdmin?.surname}
          </p>
          <p>{currentAdmin?.email}</p>
        </div>
      </div>
    );
  };

  const DropdownMenu = ({ text }) => {
    return <span style={{}}>{text}</span>;
  };

  const items = [
    {
      label: <ProfileDropdown className="headerDropDownMenu" />,
      key: 'ProfileDropdown',
    },
    {
      type: 'divider',
    },
    // Role Switcher (only for admin/owner)
    ...(currentAdmin?.availableRoles && currentAdmin.availableRoles.length > 1
      ? [
          {
            key: 'roleSwitcher',
            label: (
              <div style={{ padding: '8px 0' }}>
                <div style={{ marginBottom: 8, fontWeight: 'bold' }}>{translate('Switch Role')}</div>
                <Select
                  style={{ width: '100%' }}
                  value={currentAdmin.role || 'default'}
                  onChange={handleRoleSwitch}
                  placeholder={translate('Select Role')}
                >
                  {currentAdmin.availableRoles.map((role) => (
                    <Select.Option key={role._id || 'default'} value={role._id || null}>
                      {role.roleName || translate('Default')}
                    </Select.Option>
                  ))}
                </Select>
                <div style={{ marginTop: 8, fontSize: '12px', color: '#999' }}>
                  {translate('Current Role')}: <Tag style={{ backgroundColor: '#6461A0', borderColor: '#6461A0', color: '#fff' }}>{currentAdmin.roleName || translate('Default')}</Tag>
                </div>
              </div>
            ),
          },
          {
            type: 'divider',
          },
        ]
      : []),
    {
      icon: <UserOutlined />,
      key: 'settingProfile',
      label: (
        <Link to={'/profile'}>
          <DropdownMenu text={translate('profile_settings')} />
        </Link>
      ),
    },
    {
      icon: <ToolOutlined />,
      key: 'settingApp',
      label: <Link to={'/settings'}>{translate('app_settings')}</Link>,
    },

    {
      type: 'divider',
    },

    {
      icon: <LogoutOutlined />,
      key: 'logout',
      label: <Link to={'/logout'}>{translate('logout')}</Link>,
    },
  ];

  return (
    <Header
      style={{
        padding: '20px',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        gap: ' 15px',
        position: 'relative',
      }}
    >
      <Dropdown
        menu={{
          items,
        }}
        trigger={['click']}
        placement="bottomRight"
        stye={{ width: '280px', float: 'right' }}
      >
        {/* <Badge dot> */}
        <Avatar
          className="last"
          src={currentAdmin?.photo ? FILE_BASE_URL + currentAdmin?.photo : undefined}
          style={{
            color: '#f56a00',
            backgroundColor: currentAdmin?.photo ? 'none' : '#fde3cf',
            boxShadow: 'rgba(150, 190, 238, 0.35) 0px 0px 10px 2px',
            float: 'right',
            cursor: 'pointer',
          }}
          size="large"
        >
          {currentAdmin?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
        {/* </Badge> */}
      </Dropdown>

      {/* Company Logo - Full Width Centered */}
      <div style={{ 
        position: 'absolute',
        left: 0,
        right: 0,
        top: 50,
        bottom: 0,
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        pointerEvents: 'none'
      }}>
        <img 
          src={headerLogo} 
          alt="Zonal DevHub" 
          style={{ 
            height: '80px', 
            width: 'auto', 
            maxWidth: '900px',
            objectFit: 'contain'
          }} 
        />
      </div>

      {/* Role Switcher in Header */}
      {currentAdmin?.availableRoles && currentAdmin.availableRoles.length > 1 && (
        <Select
          style={{ width: 150, marginRight: 10 }}
          value={currentAdmin.role || 'default'}
          onChange={handleRoleSwitch}
          suffixIcon={<SwapOutlined />}
        >
          {currentAdmin.availableRoles.map((role) => (
            <Select.Option key={role._id || 'default'} value={role._id || null}>
              {role.roleName || translate('Default')}
            </Select.Option>
          ))}
        </Select>
      )}
      {currentAdmin?.roleName && (
        <Tag style={{ backgroundColor: '#6461A0', borderColor: '#6461A0', color: '#fff', marginRight: 10 }}>
          {translate('Role')}: {currentAdmin.roleName}
        </Tag>
      )}
      {/* <AppsButton /> */}
      {/* {showUpgradeButton && <UpgradeButton />} */}
    </Header>
  );
}

//  console.log(
//    '🚀 Welcome to IDURAR ERP CRM! Did you know that we also offer commercial customization services? Contact us at hello@idurarapp.com for more information.'
//  );
