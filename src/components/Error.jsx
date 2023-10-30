import React, { useEffect } from 'react';

export default function Error({ error, setError }) {
  useEffect(() => {
    if (error) {
      // Set a timer to clear the error message after 3 seconds
      const timer = setTimeout(() => {
        setError('');
      }, 1500);

      // Clear the timer if the component unmounts or if a new error occurs
      return () => {
        clearTimeout(timer);
      };
    }
  }, [error, setError]);

  return (
    <div className={`error-message ${error ? '' : 'hide'}`}>
      {error}
    </div>
  );
}
