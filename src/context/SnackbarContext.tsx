import React, { createContext, useState, useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';

interface SnackbarContextType {
  openSnackbar: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<any> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const openSnackbar = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000} // Adjust as needed
        onClose={handleClose}
        message={message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
