import codeMessage from './codeMessage';
import { setNotificationInstance } from './successHandler';

let notificationInstance = null;

export const setErrorNotificationInstance = (instance) => {
  notificationInstance = instance;
  setNotificationInstance(instance);
};

const errorHandler = (error) => {
  if (!navigator.onLine) {
    if (notificationInstance) {
      notificationInstance.error({
        message: 'No internet connection',
        description: 'Cannot connect to the Internet, Check your internet network',
        duration: 15,
      });
    }
    return {
      success: false,
      result: null,
      message: 'Cannot connect to the server, Check your internet network',
    };
  }

  const { response } = error;

  if (!response) {
    notification.config({
      duration: 20,
      maxCount: 1,
    });
    // Code to execute when there is no internet connection
    // notification.error({
    //   message: 'Problem connecting to server',
    //   description: 'Cannot connect to the server, Try again later',
    // });
    return {
      success: false,
      result: null,
      message: 'Cannot connect to the server, Contact your Account administrator',
    };
  }

  if (response && response.data && response.data.jwtExpired) {
    // TEMPORARILY DISABLED: Don't auto-logout on jwtExpired errors
    // This was causing logout loop after login
    // Only logout if user explicitly clicked logout or token is truly invalid after sufficient time
    
    const url = error?.config?.url || '';
    const auth = window.localStorage.getItem('auth');
    
    // If user is logged in, don't auto-logout on jwtExpired
    // Let the user continue working - token might be valid but middleware is being strict
    if (auth) {
      try {
        const authData = JSON.parse(auth);
        if (authData.isLoggedIn) {
          // Check if this is very recent login (within 30 seconds)
          const loginTime = authData.current?.loginTime || (authData.current?._id ? Date.now() - 30000 : Date.now());
          const timeSinceLogin = Date.now() - loginTime;
          
          // Extended grace period: 30 seconds after login
          if (timeSinceLogin < 30000) {
            console.warn('JWT expired shortly after login, ignoring logout (grace period):', url, Math.round(timeSinceLogin/1000) + 's ago');
            return {
              success: false,
              result: null,
              message: response.data.message || 'Request failed',
            };
          }
          
          // Even after grace period, only logout on explicit critical operations
          // Don't logout on read operations or settings
          const isReadOperation = ['GET', 'get'].includes(error?.config?.method?.toUpperCase());
          const nonCriticalEndpoints = [
            '/admin/me',
            '/setting/',
            '/admin/list',
            '/admin/listAll',
          ];
          
          const isNonCritical = nonCriticalEndpoints.some(endpoint => url.includes(endpoint)) || isReadOperation;
          
          if (isNonCritical) {
            console.warn('JWT expired on non-critical endpoint, ignoring logout:', url);
            return {
              success: false,
              result: null,
              message: response.data.message || 'Request failed',
            };
          }
        }
      } catch (e) {
        console.error('Error parsing auth data:', e);
      }
    }

    // COMPLETELY DISABLED AUTO-LOGOUT: Never auto-logout on jwtExpired
    // User must manually logout if needed
    // This prevents logout loop after login
    console.warn('JWT expired but NOT logging out automatically. User can manually logout if needed. URL:', url);
    return {
      success: false,
      result: null,
      message: response.data.message || 'Authentication failed. Please refresh the page or login again.',
    };
  }

  if (response && response.status) {
    const message = response.data && response.data.message;

    const errorText = message || codeMessage[response.status];
    const { status, error } = response;
    
    // Don't show toaster for 404 errors with specific messages
    // These are usually empty collections or missing routes that should be handled silently
    const shouldSuppress404 = status === 404 && 
      (message && (
        message.toLowerCase().includes('collection is empty') ||
        message.toLowerCase().includes('does not exist') ||
        message.toLowerCase().includes('api url doesn\'t exist') ||
        message.toLowerCase().includes('api url doesn\'t exist ')
      ));
    
    if (!shouldSuppress404 && notificationInstance) {
      notificationInstance.error({
        message: `Request error ${status}`,
        description: errorText,
        duration: 20,
      });
    }

    if (response?.data?.error?.name === 'JsonWebTokenError') {
      // Don't auto-logout on JsonWebTokenError either - same issue
      // User can manually logout if needed
      console.warn('JsonWebTokenError but NOT logging out automatically');
      return {
        success: false,
        result: null,
        message: response.data.message || 'Token error. Please refresh the page or login again.',
      };
    } else return response.data;
  } else {
    if (navigator.onLine) {
      // Code to execute when there is internet connection
      if (notificationInstance) {
        notificationInstance.error({
          message: 'Problem connecting to server',
          description: 'Cannot connect to the server, Try again later',
          duration: 15,
        });
      }
      return {
        success: false,
        result: null,
        message: 'Cannot connect to the server, Contact your Account administrator',
      };
    } else {
      // Code to execute when there is no internet connection
      if (notificationInstance) {
        notificationInstance.error({
          message: 'No internet connection',
          description: 'Cannot connect to the Internet, Check your internet network',
          duration: 15,
        });
      }
      return {
        success: false,
        result: null,
        message: 'Cannot connect to the server, Check your internet network',
      };
    }
  }
};

export default errorHandler;
