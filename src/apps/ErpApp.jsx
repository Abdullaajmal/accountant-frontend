import { useLayoutEffect } from 'react';
import { useEffect } from 'react';
import { selectAppSettings } from '@/redux/settings/selectors';
import { useDispatch, useSelector } from 'react-redux';

import { Layout, App } from 'antd';
import { setErrorNotificationInstance } from '@/request/errorHandler';

import { useAppContext } from '@/context/appContext';

import Navigation from '@/apps/Navigation/NavigationContainer';

import HeaderContent from '@/apps/Header/HeaderContainer';
import PageLoader from '@/components/PageLoader';

import { settingsAction } from '@/redux/settings/actions';
import { refreshUserPermissions } from '@/redux/auth/actions';
import { selectAuth } from '@/redux/auth/selectors';

import { selectSettings } from '@/redux/settings/selectors';

import AppRouter from '@/router/AppRouter';

import useResponsive from '@/hooks/useResponsive';

import storePersist from '@/redux/storePersist';

function ErpCrmAppContent() {
  const { Content } = Layout;
  const { notification } = App.useApp();
  
  useEffect(() => {
    setErrorNotificationInstance(notification);
  }, [notification]);

  // const { state: stateApp, appContextAction } = useAppContext();
  // // const { app } = appContextAction;
  // const { isNavMenuClose, currentApp } = stateApp;

  const { isMobile } = useResponsive();

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(selectAuth);

  useLayoutEffect(() => {
    // Only load settings if user is logged in
    if (isLoggedIn) {
      dispatch(settingsAction.list({ entity: 'setting' }));
    }
  }, [dispatch, isLoggedIn]);

  // REAL-TIME PERMISSION REFRESH: Load fresh permissions on app load
  useEffect(() => {
    if (isLoggedIn) {
      // Delay permission refresh slightly to ensure token is properly set
      // This prevents logout loop after login
      const timer = setTimeout(() => {
        dispatch(refreshUserPermissions());
      }, 1000); // 1 second delay
      
      return () => clearTimeout(timer);
    }
  }, [dispatch, isLoggedIn]);

  // const appSettings = useSelector(selectAppSettings);

  const { isSuccess: settingIsloaded } = useSelector(selectSettings);

  // useEffect(() => {
  //   const { loadDefaultLang } = storePersist.get('firstVisit');
  //   if (appSettings.idurar_app_language && !loadDefaultLang) {
  //     window.localStorage.setItem('firstVisit', JSON.stringify({ loadDefaultLang: true }));
  //   }
  // }, [appSettings]);

  if (settingIsloaded)
    return (
      <Layout hasSider>
        <Navigation />

        {isMobile ? (
          <Layout style={{ marginLeft: 0 }}>
            <HeaderContent />
            <Content
              style={{
                margin: '40px auto 30px',
                overflow: 'initial',
                width: '100%',
                padding: '0 25px',
                maxWidth: 'none',
              }}
            >
              <AppRouter />
            </Content>
          </Layout>
        ) : (
          <Layout>
            <HeaderContent />
            <Content
              style={{
                margin: '40px auto 30px',
                overflow: 'initial',
                width: '100%',
                padding: '0 50px',
                maxWidth: 1400,
              }}
            >
              <AppRouter />
            </Content>
          </Layout>
        )}
      </Layout>
    );
  else return <PageLoader />;
}

export default function ErpCrmApp() {
  return (
    <App>
      <ErpCrmAppContent />
    </App>
  );
}
