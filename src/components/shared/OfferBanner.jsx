import React, { useState } from 'react';

const OfferBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 text-center relative">
      <p className="text-sm sm:text-base font-medium">
        🎉 New! Get 50% off on premium job listings for the next 24 hours! Use code: JOBNEST50
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 focus:outline-none"
        aria-label="Close offer banner"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default OfferBanner;

