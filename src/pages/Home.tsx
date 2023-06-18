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
import { response } from 'express';

const Home = () => {
  const images = [
    '../../public/images/house1.png',
    '../../public/images/house2.png',
    '../../public/images/house 3.png',
    '../../public/images/house4.png',
    '../../public/images/house5.png',
    '../../public/images/house6.png',
  ];
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:3000/api/apartments").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <div className="display"></div>
      <Slideshow images={images} />
      <Navbar />
      <div className="hot-apartments-heading">
        <ul className="line"></ul>
        <b>AVAILABLE APARTMENTS</b>
      </div>
      <ul className="line"></ul>
      <div className="cards">
        <ApartmentCard images={images} />
        <ApartmentCard images={images} />
        <ApartmentCard images={images} />
        <ApartmentCard images={images} />
        <ApartmentCard images={images} />
        <ApartmentCard images={images} />
        <ApartmentCard images={images} />
        <ApartmentCard images={images} />
        <ApartmentCard images={images} />
      </div>
      <a href='/apartments' className='see-all-apartment-link'>
        <button
          style={{
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: 'rgb(133, 180, 165)',
            margin: '5px auto',
            display: 'block',
            border: '0.5px',
            width: '80%',
            maxWidth: '300px',
          }}
        >
          See All Apartments
        </button>
      </a>
      <h5 className="contact-heading">Latest Locations</h5>
      <div className='map-container'>
        <Map latitude={6.9} longitude={3.4} />
      </div>
      <ul className='line'></ul>
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
