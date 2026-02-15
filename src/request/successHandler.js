import { App } from 'antd';

import codeMessage from './codeMessage';

// Get notification instance from App context
let notificationInstance = null;

export const setNotificationInstance = (instance) => {
  notificationInstance = instance;
};

const successHandler = (response, options = { notifyOnSuccess: false, notifyOnFailed: true }) => {
  const { data } = response;
  if (data && data.success === true) {
    const message = response.data && data.message;
    const successText = message || codeMessage[response.status];

    if (options.notifyOnSuccess && notificationInstance) {
      notificationInstance.success({
        message: `Request success`,
        description: successText,
        duration: 2,
      });
    }
  } else {
    const message = response.data && data.message;
    const errorText = message || codeMessage[response.status];
    const { status } = response;
    
    // Don't show toaster for 404 errors with specific messages
    // These are usually empty collections or missing routes that should be handled silently
    const shouldSuppress404 = status === 404 && 
      (message && (
        message.toLowerCase().includes('collection is empty') ||
        message.toLowerCase().includes('does not exist') ||
        message.toLowerCase().includes('api url doesn\'t exist') ||
        message.toLowerCase().includes('api url doesn\'t exist ')
      ));
    
    if (options.notifyOnFailed && !shouldSuppress404 && notificationInstance) {
      notificationInstance.error({
        message: `Request error ${status}`,
        description: errorText,
        duration: 4,
      });
    }
  }
};

export default successHandler;
