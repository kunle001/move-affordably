import React, { useState, useEffect } from 'react';
import '../../public/css/InfoScrolling.css';

const InfoScrollingComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [infoData, setInfoData] = useState([
    'Information 1',
    'Information 2',
    'Information 3',
    'Information 4',
    'Information 5',
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % infoData.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [infoData.length]);

  return (
    <div className="info-scrolling-container">
      <h3 className="info-scrolling-heading">Apartment Updates</h3>
      <div className="info-scrolling-content">
        {infoData.map((info, index) => (
          <div
            key={index}
            className={`info-item ${index === currentIndex ? 'active' : ''}`}
          >
            {info}
          </div>
        ))}
        {infoData.map((info, index) => (
          <div
            key={index + infoData.length}
            className={`info-item ${index === currentIndex ? 'active' : ''}`}
          >
            {info}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoScrollingComponent;
