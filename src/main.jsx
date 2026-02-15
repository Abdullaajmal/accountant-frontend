import { createRoot } from 'react-dom/client';

import RootApp from './RootApp';

// Suppress MetaMask extension errors (not related to application)
window.addEventListener('error', (event) => {
  if (
    event.message?.includes('MetaMask') ||
    event.message?.includes('metamask') ||
    event.filename?.includes('inpage.js') ||
    event.error?.message?.includes('MetaMask extension not found')
  ) {
    event.preventDefault();
    return false;
  }
});

// Suppress unhandled promise rejections from MetaMask
window.addEventListener('unhandledrejection', (event) => {
  if (
    event.reason?.message?.includes('MetaMask') ||
    event.reason?.message?.includes('metamask') ||
    event.reason?.message?.includes('MetaMask extension not found')
  ) {
    event.preventDefault();
    return false;
  }
});

const root = createRoot(document.getElementById('root'));
root.render(<RootApp />);
