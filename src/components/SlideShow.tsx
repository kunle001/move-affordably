import React, { useState, useEffect } from 'react';
import '../../public/css/SlideShow.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apartmentType, room } from '../../api/src/models/roomSpec';

interface DataProps {
  location: {
    type: string;
    coordinates: [number];
    address: string;
    description?: string;
  };
  checkpoints: [string];
  annualPackage: number;
  totalPackage: number;
  distanceFromCheckPoints: [number];
  images: [string];
  landlordSpecs: string;
  roomCategory?: room;
  apartmentType: apartmentType;
  createdAt: Date;
  description: string;
  id: string
}

const Slideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [backendData, setBackendData] = useState<DataProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataProps[]>('http://localhost:3000/api/apartments');
        setBackendData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Auto-advance the slideshow every 3 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % backendData.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [backendData.length]);

  return (

    <div className="slideshow-container">
      <div className="slidenshow">
        {backendData.map((data: DataProps, index: number) => (
          <Link to={`/apartment/${data.id}`} className="slideshow-link">
            <div
              key={index}
              className={`slideshow-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img src={`../../public/images/${data.images[0]}`} alt="Apartment" className="slidenshow-image" />
              <div className="slideshow-text">
                <h2 className="slide-title">{data.location.address}</h2>
                <b className="slideshow-price-text">{data.annualPackage}# Per Year</b>
                <p className="slideshow-description">{data.description}</p>
                <li style={{ color: 'yellow' }}>{data.distanceFromCheckPoints[0]} Km from {data.checkpoints[0]}</li>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>

  );
};

export default Slideshow;
