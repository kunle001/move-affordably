import React, { useState } from 'react';
import '../../public/css/Alert.css';

interface CustomAlertProps {
  message: string;
  type: 'success' | 'error' | 'warning';
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className={`custom-alert custom-alert-${type}`}>
        <p className="custom-alert-message">{message}</p>
        <button className="custom-alert-close" onClick={handleClose}>
          &times;
        </button>
      </div>
    )
  );
};

export default CustomAlert;
