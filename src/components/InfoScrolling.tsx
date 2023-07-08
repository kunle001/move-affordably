import React, { useState, useEffect } from 'react';
import '../../public/css/InfoScrolling.css';

const InfoScrollingComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [infoData, setInfoData] = useState([
    'Get free cleaning for your first apartment with us 🧚‍♂️ ',
    'Get 50% discount on consultancy fee🤝',
    'Sign up with us and become an agent',
    'Anticipate our currency💸',
    'Vacancy for customer care Agent, call us',
    'We are trusted and reliable 🤗',
    'We are a verified company ✅ '
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
