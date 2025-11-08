// src/context/AlertContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = useCallback((message, type = 'info') => {
    const id = Date.now();
    const newAlert = { id, message, type };
    
    setAlerts(prev => [...prev, newAlert]);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, 5000);
  }, []);

  const dismissAlert = useCallback((id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  const success = useCallback((message) => showAlert(message, 'success'), [showAlert]);
  const error = useCallback((message) => showAlert(message, 'error'), [showAlert]);
  const warning = useCallback((message) => showAlert(message, 'warning'), [showAlert]);
  const info = useCallback((message) => showAlert(message, 'info'), [showAlert]);

  const value = {
    alerts,
    showAlert,
    dismissAlert,
    success,
    error,
    warning,
    info
  };

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
};