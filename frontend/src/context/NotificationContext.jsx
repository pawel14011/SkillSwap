import React, { createContext } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const notify = {
    success: (message) => toast.success(message),
    error: (message) => toast.error(message),
    info: (message) => toast(message),
  };

  return (
    <NotificationContext.Provider value={notify}>
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;