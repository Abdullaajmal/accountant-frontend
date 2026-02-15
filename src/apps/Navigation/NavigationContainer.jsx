import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer, Layout, Menu } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { useAppContext } from '@/context/appContext';
import { selectCurrentAdmin } from '@/redux/auth/selectors';
import { refreshUserPermissions } from '@/redux/auth/actions';

import useLanguage from '@/locale/useLanguage';
import logo from '@/icon1.png';

import useResponsive from '@/hooks/useResponsive';

import {
  SettingOutlined,
  CustomerServiceOutlined,
  ContainerOutlined,
  FileSyncOutlined,
  DashboardOutlined,
  TagOutlined,
  TagsOutlined,
  UserOutlined,
  CreditCardOutlined,
  MenuOutlined,
  FileOutlined,
  ShopOutlined,
  FilterOutlined,
  WalletOutlined,
  ReconciliationOutlined,
  AccountBookOutlined,
  BookOutlined,
  GlobalOutlined,
  ShoppingOutlined,
  TeamOutlined,
  DollarOutlined,
  BarChartOutlined,
  CalendarOutlined,
  SwapOutlined,
  BankOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

export default function Navigation() {
  const { isMobile } = useResponsive();

  return isMobile ? <MobileSidebar /> : <Sidebar collapsible={false} />;
}

function Sidebar({ collapsible, isMobile = false }) {
  let location = useLocation();

  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);
  const [currentPath, setCurrentPath] = useState(location.pathname.slice(1));

  const translate = useLanguage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentAdmin = useSelector(selectCurrentAdmin);
  
  // REAL-TIME PERMISSION REFRESH: Load fresh permissions on mount and periodically
  useEffect(() => {
    if (currentAdmin?._id) {
      // Refresh permissions immediately on mount
      dispatch(refreshUserPermissions());
      
      // Refresh permissions every 30 seconds to catch role updates
      const interval = setInterval(() => {
        dispatch(refreshUserPermissions());
      }, 30000); // 30 seconds
      
      return () => {
        clearInterval(interval);
      };
    }
  }, [dispatch, currentAdmin?._id]);
  
  // Get user role and permissions from Role (fresh from database)
  // Backend returns roleName and permissions directly in currentAdmin
  const userRole = currentAdmin?.roleName?.toLowerCase() || 'admin';
  const userPermissions = currentAdmin?.permissions || {};
  
  // Debug logging
  console.log('🔍 Navigation Debug:', {
    currentAdmin: currentAdmin ? { 
      _id: currentAdmin._id, 
      email: currentAdmin.email,
      roleName: currentAdmin.roleName,
      hasRole: !!currentAdmin.role,
    } : null,
    userRole,
    hasPermissions: !!userPermissions,
    permissionsKeys: Object.keys(userPermissions || {}),
    permissionsCount: Object.keys(userPermissions || {}).length,
  });
  
  // Helper function to check if a menu item should be shown
  const shouldShowMenuItem = (key) => {
    // Always show dividers
    if (!key) {
      return true;
    }
    
    // Super admin check: manager role OR no role assigned (first admin)
    const isSuperAdmin = 
      userRole === 'manager' || 
      userRole === 'admin' || 
      userRole === 'owner' ||
      (!currentAdmin?.role && (!userPermissions || Object.keys(userPermissions).length === 0));

    if (isSuperAdmin) {
      return true; // Super admin sees everything
    }

    // Map sidebar keys to permission flags stored on the role
    const permissionMap = {
      dashboard: 'dashboard',
      customer: 'customers',
      invoice: 'invoices',
      quote: 'quotes',
      payment: 'payments',
      paymentMode: 'payments',
      expense: 'expenses',
      package: 'packages',
      supplier: 'suppliers',
      visapackage: 'visaPackages',
      hotelbooking: 'hotelBookings',
      booking: 'hotelBookings', // Use same permission for booking
      account: 'accounts',
      journalentry: 'journalEntries',
      bankAccount: 'bankAccounts',
      financialyear: 'financialYear',
      employee: 'employees',
      attendance: 'attendance',
      payroll: 'payroll',
      commission: 'commission',
      company: 'company',
      reports: 'reports',
      reportsdashboard: 'reports',
      ledger: 'financialReports',
      trialbalance: 'financialReports',
      profitloss: 'financialReports',
      balancesheet: 'financialReports',
      commissionreport: 'reports',
      profitanalysis: 'reports',
      businessinsights: 'reports',
      generalSettings: 'settings',
      role: 'roles',
      taxes: 'settings',
      currencyconverter: 'settings',
    };

    const permissionKey = permissionMap[key];

    // If no explicit mapping for this key, hide it for restricted roles
    if (!permissionKey) {
      return false;
    }

    // FALLBACK: If no permissions loaded, use role-based defaults
    if (!userPermissions || Object.keys(userPermissions).length === 0) {
      console.warn('⚠️ No permissions loaded for user:', userRole, '- Using role-based defaults');
      
      // Accountant role default permissions
      if (userRole === 'accountant') {
        const accountantDefaultPermissions = {
          dashboard: true,
          invoices: true,
          payments: true,
          expenses: true,
          accounts: true,
          journalEntries: true,
          bankAccounts: true,
          financialYear: true,
          payroll: true,
          reports: true,
          financialReports: true,
        };
        return accountantDefaultPermissions[permissionKey] === true;
      }
      
      // For other roles without permissions, hide menu items
      return false;
    }

    // STRICT CHECK: Only show item if the corresponding permission is explicitly true
    // If permission is false, undefined, null, or any other value, hide the menu item
    const permissionValue = userPermissions[permissionKey];
    
    // Explicitly check for true - anything else (false, undefined, null, 0, '') should hide the menu
    if (permissionValue !== true) {
      return false;
    }
    
    return true;
  };

  const items = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link to={'/'}>{translate('dashboard')}</Link>,
    },
    {
      type: 'divider',
    },
    {
      key: 'invoice',
      icon: <ContainerOutlined />,
      label: <Link to={'/invoice'}>{translate('invoices')}</Link>,
    },
    {
      key: 'payment',
      icon: <CreditCardOutlined />,
      label: <Link to={'/payment'}>{translate('payments')}</Link>,
    },
    {
      key: 'expense-top',
      label: <Link to={'/expense'}>{translate('Expenses')}</Link>,
      icon: <DollarOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'account',
      label: <Link to={'/account'}>{translate('Chart of Accounts')}</Link>,
      icon: <AccountBookOutlined />,
    },
    {
      key: 'journalentry',
      label: <Link to={'/journalentry'}>{translate('Journal Entries')}</Link>,
      icon: <BookOutlined />,
    },
    {
      key: 'bankAccount',
      label: <Link to={'/bank-account'}>{translate('Bank Accounts')}</Link>,
      icon: <BankOutlined />,
    },
    {
      key: 'financialyear',
      label: <Link to={'/financialyear'}>{translate('Financial Year') || 'Financial Year'}</Link>,
      icon: <CalendarOutlined />,
    },
    {
      key: 'payroll',
      label: <Link to={'/payroll'}>{translate('Payroll') || 'Payroll'}</Link>,
      icon: <DollarOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'customer',
      icon: <CustomerServiceOutlined />,
      label: <Link to={'/customer'}>{translate('customers')}</Link>,
    },
    {
      key: 'quote',
      icon: <FileSyncOutlined />,
      label: <Link to={'/quote'}>{translate('quote')}</Link>,
    },

    {
      key: 'paymentMode',
      label: <Link to={'/payment/mode'}>{translate('payments_mode')}</Link>,
      icon: <WalletOutlined />,
    },
    {
      key: 'taxes',
      label: <Link to={'/taxes'}>{translate('taxes')}</Link>,
      icon: <ShopOutlined />,
    },
    {
      key: 'currencyconverter',
      label: <Link to={'/currency-converter'}>{translate('Currency Converter') || 'Currency Converter'}</Link>,
      icon: <SwapOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'company',
      label: <Link to={'/company'}>{translate('Companies') || 'Companies'}</Link>,
      icon: <ShopOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'employee',
      label: <Link to={'/employee'}>{translate('Employees') || 'Employees'}</Link>,
      icon: <UserOutlined />,
    },
    {
      key: 'attendance',
      label: <Link to={'/attendance'}>{translate('Attendance') || 'Attendance'}</Link>,
      icon: <CalendarOutlined />,
    },
    {
      key: 'commission',
      label: <Link to={'/commission'}>{translate('Commission') || 'Commission'}</Link>,
      icon: <DollarOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'visapackage',
      label: <Link to={'/visapackage'}>{translate('Visa Packages') || 'Visa Packages'}</Link>,
      icon: <GlobalOutlined />,
    },
    {
      key: 'hotelbooking',
      label: <Link to={'/hotelbooking'}>{translate('Hotel Bookings') || 'Hotel Bookings'}</Link>,
      icon: <ShopOutlined />,
    },
    {
      key: 'booking',
      label: <Link to={'/booking'}>{translate('Bookings') || 'Bookings'}</Link>,
      icon: <ShoppingOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'package',
      label: <Link to={'/package'}>{translate('Packages')}</Link>,
      icon: <ShoppingOutlined />,
    },
    {
      key: 'supplier',
      label: <Link to={'/supplier'}>{translate('Suppliers')}</Link>,
      icon: <TeamOutlined />,
    },
    {
      key: 'expense',
      label: <Link to={'/expense'}>{translate('Expenses')}</Link>,
      icon: <DollarOutlined />,
    },
    {
      key: 'reports',
      type: 'submenu',
      label: translate('Reports'),
      icon: <BarChartOutlined />,
      children: [
        {
          key: 'reportsdashboard',
          label: <Link to={'/reports'}>{translate('Reports Dashboard')}</Link>,
        },
        {
          type: 'divider',
        },
        {
          key: 'ledger',
          label: <Link to={'/reports/ledger'}>{translate('General Ledger')}</Link>,
        },
        {
          key: 'trialbalance',
          label: <Link to={'/reports/trialbalance'}>{translate('Trial Balance')}</Link>,
        },
        {
          key: 'profitloss',
          label: <Link to={'/reports/profitloss'}>{translate('Profit & Loss')}</Link>,
        },
        {
          key: 'balancesheet',
          label: <Link to={'/reports/balancesheet'}>{translate('Balance Sheet')}</Link>,
        },
        {
          key: 'commissionreport',
          label: <Link to={'/reports/commissionreport'}>{translate('Commission Report')}</Link>,
        },
        {
          key: 'profitanalysis',
          label: <Link to={'/reports/profitanalysis'}>{translate('Profit Analysis')}</Link>,
        },
        {
          key: 'businessinsights',
          label: <Link to={'/reports/businessinsights'}>{translate('Business Insights')}</Link>,
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'generalSettings',
      label: <Link to={'/settings'}>{translate('settings')}</Link>,
      icon: <SettingOutlined />,
    },
    {
      key: 'role',
      label: <Link to={'/role'}>{translate('Roles') || 'Roles'}</Link>,
      icon: <TeamOutlined />,
    },
    {
      key: 'about',
      label: <Link to={'/about'}>{translate('about')}</Link>,
      icon: <ReconciliationOutlined />,
    },
  ];

  // Apply permission-based filtering to menu items
  const filteredItems = items
    .map((item) => {
      // Always keep dividers
      if (item.type === 'divider') {
        return item;
      }
      
      if (item.children && Array.isArray(item.children)) {
        const filteredChildren = item.children
          .filter((child) => {
            // Keep dividers in submenu
            if (child.type === 'divider') {
              return true;
            }
            return child.key ? shouldShowMenuItem(child.key) : true;
          });
        
        // Only show parent if it has visible children
        if (filteredChildren.length > 0) {
          return { ...item, children: filteredChildren };
        }
        return null;
      }
      return item;
    })
    .filter((item) => {
      // Keep dividers and items that pass permission check
      if (!item) return false;
      if (item.type === 'divider') return true;
      return item.key ? shouldShowMenuItem(item.key) : true;
    });
  
  console.log('📋 Filtered Menu Items:', filteredItems.length, filteredItems.map(i => i.key || i.type));

  useEffect(() => {
    if (location)
      if (currentPath !== location.pathname) {
        if (location.pathname === '/') {
          setCurrentPath('dashboard');
        } else setCurrentPath(location.pathname.slice(1));
      }
  }, [location, currentPath]);

  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);
  const onCollapse = () => {
    navMenu.collapse();
  };

  return (
    <Sider
      collapsible={collapsible}
      collapsed={collapsible ? isNavMenuClose : collapsible}
      onCollapse={onCollapse}
      className="navigation"
      width={256}
      style={{
        overflow: 'auto',
        height: '100vh',

        position: isMobile ? 'absolute' : 'relative',
        bottom: '20px',
        ...(!isMobile && {
          // border: 'none',
          ['left']: '20px',
          top: '20px',
          // borderRadius: '8px',
        }),
      }}
      theme={'light'}
    >
      <div
        className="logo"
        onClick={() => navigate('/')}
        style={{
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '15px 10px',
        }}
      >
        <img src={logo} alt="Logo" style={{ height: 'auto', width: '100%', maxHeight: '60px', objectFit: 'contain', marginBottom: '10px' }} />
        <div style={{ 
          color: '#000000', 
          fontSize: '18px', 
          fontWeight: 600, 
          letterSpacing: '0.5px',
          textAlign: 'center',
          marginTop: '5px'
        }}>
          Zonal DevHub
        </div>
      </div>
      <Menu
        items={filteredItems}
        mode="inline"
        theme={'light'}
        selectedKeys={[currentPath]}
        style={{
          width: 256,
        }}
      />
    </Sider>
  );
}

function MobileSidebar() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        type="text"
        size="large"
        onClick={showDrawer}
        className="mobile-sidebar-btn"
        style={{ ['marginLeft']: 25 }}
      >
        <MenuOutlined style={{ fontSize: 18 }} />
      </Button>
      <Drawer
        width={250}
        // style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
        placement={'left'}
        closable={false}
        onClose={onClose}
        open={visible}
      >
        <Sidebar collapsible={false} isMobile={true} />
      </Drawer>
    </>
  );
}
