import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import '../../public/css/ApartmentCard.css';
import '../../public/css/SlideShow.css';
import { apartmentType, room } from '../../api/src/models/roomSpec';

import { FaMapMarkerAlt } from 'react-icons/fa';


interface DataProps {
  location: {
    coordinates: number[];
    address: string;
    description?: string;
  };
  checkpoints: string[];
  annualPackage: number;
  totalPackage: number;
  distanceFromCheckPoints: number[];
  images: string[];
  landlordSpecs: string;
  roomCategory?: room;
  apartmentType: apartmentType;
  createdAt: Date;
  description: string;
  id: string
}

const ApartmentCard = (data: DataProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % data.images.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [data.images.length]);

  const handleLike = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <Link to={`/apartment/${data.id}`} className="apartment-card-link">
      <div className="apartment-card">
        <div className="slideshow-container">
          <div className="slideshow" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {data.images.map((image, index) => (
              <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
                <img src={`../../public/images/${image}`} alt={image} className="slide-image" />
              </div>
            ))}
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title text-center">
            <FaMapMarkerAlt style={{ color: 'red' }} /> {data.location.address}
          </h5>
          <p className="card-text">
            {data.description}
          </p>
          <ul className="list-group">
            <li className="list-group-item"><b style={{ color: 'burlywood' }}>Room Size:</b> {data.roomCategory}</li>
            <li className="list-group-item"><b style={{ color: 'yellowgreen' }}>Apartment Type:</b> {data.apartmentType}</li>
            <li className="list-group-item"> <b style={{ color: 'darkcyan' }}>Landlord Specication:</b> {data.landlordSpecs}</li>
            <li className="list-group-item">
              {
                data.distanceFromCheckPoints.map((distance, index) => (
                  <b style={{ color: 'gray', display: 'flex', flexDirection: 'column' }}>{distance}Km From {data.checkpoints[index]}</b>
                ))
              }
            </li>
          </ul>
        </div>
        <div className="card-footer">
          <div className="card-price">{data.annualPackage}#/Year</div>
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
