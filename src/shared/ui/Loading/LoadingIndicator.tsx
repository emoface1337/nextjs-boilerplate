import React from 'react';

const LoadingIndicator = () => {
  return (
    <div>
      <div className="p-4">
        <h2>Loading...</h2>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;