import React, { useEffect, useState } from 'react';
import LoadingPage from './LoadingPage'; 

const withLoading = (WrappedComponent) => {
  return function WithLoading(props) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      console.log('Loading effect started');
      const timer = setTimeout(() => {
        console.log('Loading finished');
        setLoading(false);
      }, 6000); // Duration of the loading (6 seconds)

      return () => clearTimeout(timer);
    }, []);

    return (
      <>
        {/* Show the loading screen if it's still loading */}
        {loading && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}>
            <LoadingPage />
          </div>
        )}

        {/* Always render the wrapped component, but hide it visually while loading */}
        <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
          <WrappedComponent {...props} />
        </div>
      </>
    );
  };
};

export default withLoading;
