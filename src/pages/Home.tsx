import React, { useEffect, useState } from 'react';
import ApartmentCard from '../components/ApartmentCard';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Slideshow from '../components/SlideShow';
import Footer from '../components/Footer';
import '../../public/css/Contact.css';
import Button from '../components/Button';
import Newsletter from '../components/NewsLetter';
import Map from '../components/Map';
import { apartmentType, room } from '../../api/src/models/roomSpec';
import ReviewCard from '../components/ReviewsCard';
import axios from 'axios'
import Asection from '../components/Asection';

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
  id: string;
};

interface ReviewData {
  rating: number,
  comment: string;
  user: {
    name: string,
    image: string,
  },
  createdAt: number
}

const Home = () => {
  const [reviewsData, setReviewsData] = useState<ReviewData[]>([{
    rating: 0,
    comment: '',
    user: {
      name: '',
      image: '',
    },
    createdAt: 0
  }]);

  useEffect(() => {
    axios.get<ReviewData[]>('http://localhost:3000/api/reviews')
      .then((res) => {
        setReviewsData(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }, []);

  const reviews = [
    {
      name: 'Wole',
      rating: 5,
      comment: 'I really Got my Apartment, This is an awesome site',
      imageUrl: '../../public/images/user1.png'
    },
    {
      name: 'Mrs Oluyemi',
      rating: 5,
      comment: 'try it for your self, this is awesome',
      imageUrl: '../../public/images/user1.png'
    },
    {
      name: 'Adeyemo',
      rating: 4.5,
      comment: 'This has to be the bast if the best!!',
      imageUrl: '../../public/images/user1.png'
    }
  ]
  const images = [
    '../../public/images/house1.png',
    '../../public/images/house2.png',
    '../../public/images/house 3.png',
    '../../public/images/house4.png',
    '../../public/images/house5.png',
    '../../public/images/house6.png',
  ];
  const [backendData, setBackendData] = useState<DataProps[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/apartments')
      .then((response) => response.json())
      .then((data: DataProps[]) => {
        setBackendData(data);
      });
  }, []);

  return (
    <div className='home-page-container'>
      <div className="display">
        <Navbar />
        <Slideshow />
      </div>
      <div className="hot-apartments-heading">
        <ul className="line"></ul>
      </div>
      <b className='contact-heading'>APARTMENTS</b>
      <ul className="line"></ul>
      <div className="cards">
        {backendData.map(
          (
            {
              location,
              checkpoints,
              annualPackage,
              totalPackage,
              distanceFromCheckPoints,
              images,
              landlordSpecs,
              roomCategory,
              apartmentType,
              createdAt,
              description,
              id
            },
            index
          ) => (
            <ApartmentCard
              key={index}
              location={location}
              checkpoints={checkpoints}
              annualPackage={annualPackage}
              totalPackage={totalPackage}
              distanceFromCheckPoints={distanceFromCheckPoints}
              images={images}
              landlordSpecs={landlordSpecs}
              roomCategory={roomCategory}
              apartmentType={apartmentType}
              createdAt={createdAt}
              description={description}
              id={id}
            />
          )
        )}
      </div>
      <a href="/apartments" className="see-all-apartment-link">
        <button
          style={{
            padding: '10px',
            borderRadius: '5px',
            color: '#1d4e11',
            backgroundColor: 'white',
            margin: '5px auto',
            display: 'block',
            border: '0.5px',
            width: '80%',
            maxWidth: '300px',
          }}
        >
          All Apartments
        </button>
      </a>
      <h5 className="contact-heading">Latest Reviews</h5>
      <div className="reviews-container">
        {reviewsData.map((data, i) => (
          <ReviewCard
            name={data.user.name}
            rating={data.rating}
            comment={data.comment}
            date={data.createdAt}
            imageUrl={`../../public/images/users/${data.user.image}`}
          />
        ))}
      </div>
      <About />
      <ul className="line"></ul>
      <Newsletter />
      <h5 className="contact-heading">Contact us</h5>
      <div className="contact">
        <form>
          <input type="email" placeholder="Email" />
          <textarea placeholder="Enter your message"></textarea>
          <Button color="secondary" onClick={() => { }}>
            Send Message
          </Button>
        </form>
        <div className="image-container">
          <img
            className="customer-image"
            src="https://th.bing.com/th/id/R.6a6ef61392bab553cb9083eaf118235f?rik=mCwHnmfxkoWiKQ&pid=ImgRaw&r=0"
            alt="Customer"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
