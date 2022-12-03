import React, { useEffect } from 'react'

const Alert = ({ color, msg, removeAlert }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [removeAlert]);
  return (
    <p className={`alert alert-${color}`}>{msg}</p>
  );
}

export default Alert
