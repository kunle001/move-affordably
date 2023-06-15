import React, { useState, useEffect } from 'react';
import '../../public/css/SlideShow.css';

interface Props {
  images: string[]
}

const Slideshow = ({ images }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Auto-advance the slideshow every 3 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [images.length]);

  return (
    <div className="slidershow-container">
      <div className="slidershow">
        <img src={images[currentSlide]} alt="Apartment" className="slideshow-image" />
        <div className="slideshow-text">
          <h2 className="slide-title">Allen, Ikeja</h2>
          <b style={{ color: 'rgb(40, 202, 72)' }}>200,000# Per Year</b>
          <p className="slide-description">Spacious living room with modern design</p>
        </div>
      </div>
    </div>
  );
}

export default Slideshow;
