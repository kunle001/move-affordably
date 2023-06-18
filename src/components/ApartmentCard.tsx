import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import '../../public/css/ApartmentCard.css';
import '../../public/css/SlideShow.css';

interface Props {
  images: string[];
}

const ApartmentCard = ({ images }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  const handleLike = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <Link to="/apartment/123" className="apartment-card-link">
      <div className="apartment-card">
        <div className="slideshow-container">
          <div className="slideshow" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {images.map((image, index) => (
              <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
                <img src={image} alt={image} className="slide-image" />
              </div>
            ))}
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title text-center">Location: Ikeja</h5>
          <p className="card-text">
            This place is 50km away from Iyana-Ipaja, and it costs 500 Naira for transportation. Below are the features:
          </p>
          <ul className="list-group">
            <li className="list-group-item">Three Bedrooms</li>
            <li className="list-group-item">Two Bathrooms</li>
            <li className="list-group-item">Spacious Living Room</li>
            <li className="list-group-item">
              <b style={{ color: 'gray' }}>50 Kilometers</b> From Oshodi
            </li>
          </ul>
        </div>
        <div className="card-footer">
          <div className="card-price">#250,000/Year</div>
          <div className="card-actions">
            <Button color="success" onClick={() => { console.log('Learn More') }}>
              Learn More
            </Button>
            <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLike}>
              <i className="fas fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ApartmentCard;
