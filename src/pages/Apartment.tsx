import React, { useState, useEffect } from 'react';
import { useParams, Route } from 'react-router-dom';
import Slider, { Settings } from 'react-slick';
import {
  FaHeart,
  FaMoneyBillWave,
  FaSwimmingPool,
  FaParking,
  FaShieldAlt,
} from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../public/css/Apartment.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Comment from '../components/Comment';
import Map from '../components/Map';
import { apartmentType, room } from '../../api/src/models/roomSpec';
import axios from 'axios';

interface Location {
  type: string;
  coordinates: number[];
  address: string;
  description?: string;
}

interface CommentData {
  comment: string;
  createdAt: string;
  user: string;
}

interface DataProps {
  location: Location;
  checkpoints: string[];
  annualPackage: number;
  totalPackage: number;
  distanceFromCheckPoints: number[];
  images: string[];
  landlordSpecs: string;
  roomCategory?: room;
  apartmentType: '';
  createdAt: Date;
  description: string;
  comments: CommentData[];
}

interface Comment {
  id: number;
  text: string;
}

const SingleApartment: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [backendData, setBackendData] = useState<DataProps>({
    location: {
      type: '',
      coordinates: [],
      address: '',
    },
    checkpoints: [''],
    annualPackage: 0,
    totalPackage: 0,
    distanceFromCheckPoints: [0],
    images: [''],
    landlordSpecs: '',
    apartmentType: '',
    createdAt: new Date(),
    description: '',
    comments: [],
  });

  useEffect(() => {
    axios
      .get<DataProps>(`http://localhost:3000/api/apartment/${id}`)
      .then((response) => {
        setBackendData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, [id]);

  const apartmentImages = [
    'house4.png',
    'house5.png',
    'house6.png',
    'house7.png',
    'house10.png',
  ];

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setNewComment(event.target.value);
  };

  const handleAddComment = (): void => {
    if (newComment.trim() !== '') {
      const newCommentObject: Comment = {
        id: Date.now(),
        text: newComment,
      };

      setComments((prevComments) => [...prevComments, newCommentObject]);
      setNewComment('');
    }
  };

  const handleLike = (): void => {
    // Perform like action
  };

  const handlePayment = (): void => {
    // Perform payment action
  };

  const renderComments = (): JSX.Element[] => {
    return comments.map((comment) => (
      <div className="comment" key={comment.id}>
        {comment.text}
      </div>
    ));
  };

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
  };

  return (
    <div className="single-apartment">
      <Navbar />
      <div className="single-apartment-slider">
        <Slider {...settings}>
          {backendData.images.map((image) => (
            <div key={image}>
              <img
                className="slider-image"
                src={`../../public/images/${image}`}
                alt="Apartment"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="single-apartment-details">
        <h2 className="description-header">DESCRIPTION</h2>
        <p className="description">{backendData.description}</p>
        <div className="apartment-info">
          <div className="apartment-info-item">
            <h3>
              <small>Yearly Package: </small> {backendData.annualPackage} Naira/Year
            </h3>
            <h1 className="apartment-price">
              <FaMoneyBillWave /><small>Total Package</small> {backendData.totalPackage} Naira
            </h1>
          </div>
          <div className="apartment-info-item">
            <h3>Amenities</h3>
            <ul>
              <li>
                <FaSwimmingPool /> Gym
              </li>
              <li>
                <FaSwimmingPool /> Swimming pool
              </li>
              <li>
                <FaParking /> Parking
              </li>
              <li>
                <FaShieldAlt /> 24/7 Security
              </li>
            </ul>
          </div>
          <div className="apartment-info-item">
            <h3>Location</h3>
            <p>{backendData.location.address}</p>
          </div>
        </div>
      </div>
      <div className="single-apartment-map">
        <div className="map-container">
          <Map
            longitude={12}
            latitude={23}
          />
        </div>
      </div>
      <div className="single-apartment-comments-section">
        <h2 className="comment-header">Comments</h2>
        <ul className="line"></ul>
        {backendData.comments.map((comment, index) => (
          <Comment
            key={index}
            pictureUrl="../../public/images/user3.png"
            name={comment.user}
            createdAt={comment.createdAt}
          >
            {comment.comment}
          </Comment>
        ))}
        <div className="comments">{renderComments()}</div>
        <div className="add-comment">
          <textarea
            style={{ width: '500px' }}
            placeholder="Add a comment"
            value={newComment}
            onChange={handleCommentChange}
          />
          <button className="add-comment-button" onClick={handleAddComment}>
            Add Comment
          </button>
        </div>
      </div>
      <div className="single-apartment-actions-section">
        <button className="payment-button" onClick={handlePayment}>
          Pay
        </button>
      </div>
      <Footer />
    </div>
  );
};

// const SingleApartmentWithRoute: React.FC = () => {
//   const { id } = useParams<{ id: string }>();

//   console.log(`!!!!!!!!!!! ${id}`);
//   return <Route path={`/apartment/${id}`} element={<SingleApartment />} />;
// };

export default SingleApartment;
