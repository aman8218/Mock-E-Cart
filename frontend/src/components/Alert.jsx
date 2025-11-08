// src/components/Alert.js
import React from 'react';
import { FiCheckCircle, FiAlertCircle, FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';
import { useAlert } from '../context/AlertContext';

const Alert = () => {
  const { alerts, dismissAlert } = useAlert();

  const getAlertStyles = (type) => {
    const styles = {
      success: {
        bg: 'bg-green-50 border-green-500',
        text: 'text-green-800',
        icon: <FiCheckCircle className="text-green-500" size={20} />
      },
      error: {
        bg: 'bg-red-50 border-red-500',
        text: 'text-red-800',
        icon: <FiAlertCircle className="text-red-500" size={20} />
      },
      warning: {
        bg: 'bg-yellow-50 border-yellow-500',
        text: 'text-yellow-800',
        icon: <FiAlertTriangle className="text-yellow-500" size={20} />
      },
      info: {
        bg: 'bg-blue-50 border-blue-500',
        text: 'text-blue-800',
        icon: <FiInfo className="text-blue-500" size={20} />
      }
    };
    return styles[type] || styles.info;
  };

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {alerts.map((alert) => {
        const styles = getAlertStyles(alert.type);
        return (
          <div
            key={alert.id}
            className={`${styles.bg} ${styles.text} border-l-4 p-4 rounded-lg shadow-lg animate-slide-down flex items-start gap-3`}
          >
            <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
            <p className="flex-1 text-sm font-medium">{alert.message}</p>
            <button
              onClick={() => dismissAlert(alert.id)}
              className="flex-shrink-0 ml-2 hover:opacity-70 transition-opacity"
            >
              <FiX size={18} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Alert;