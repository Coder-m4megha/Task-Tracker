import { BrowserRouter } from 'react-router-dom';

// This is a workaround for React Router v6 future flag warnings
// It will be removed once we upgrade to React Router v7
const CustomBrowserRouter = ({ children }) => {
  // Suppress React Router warnings in development
  if (process.env.NODE_ENV === 'development') {
    // This is a hack to suppress the warnings
    const originalConsoleWarn = console.warn;
    console.warn = (...args) => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes('React Router Future Flag Warning')
      ) {
        return;
      }
      originalConsoleWarn(...args);
    };
  }

  return <BrowserRouter>{children}</BrowserRouter>;
};

export default CustomBrowserRouter;
