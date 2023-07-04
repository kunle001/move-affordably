import React, { useState, useEffect } from 'react';
import { useParams, Route } from 'react-router-dom';
import Slider, { Settings } from 'react-slick';
import { GiMoneyStack } from 'react-icons/gi';
import { IoBedOutline } from 'react-icons/io5';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../public/css/Apartment.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Comment from '../components/Comment';
import Map from '../components/Map';
import axios from 'axios';
import { FaMapMarkerAlt, FaWarehouse, FaBook } from 'react-icons/fa';

interface CommentData {
  comment: string;
  createdAt: string;
  user: string;
}

interface DataProps {
  location: {
    type: string;
    coordinates: number[];
    address: string;
    local_govt: string
  };
  checkpoints: [string];
  annualPackage: number;
  totalPackage: number;
  distanceFromCheckPoints: [number];
  images: [string];
  landlordSpecs: string;
  roomCategory?: string;
  apartmentType: string;
  createdAt: Date;
  description: string;
  formprice: number;
  videprice: number;
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
      coordinates: [1, 2],
      address: '',
      local_govt: ''
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
    formprice: 0,
    videprice: 0
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
        <ul className="line"></ul>
        <div className="apartment-info">
          <div className="apartment-info-item">
            <h1 className="apartment-price">
              <GiMoneyStack />
              <small>Yearly Package:</small> {backendData.annualPackage}{' '}
              <span>&#8358;</span>
            </h1>
            <h1 className="apartment-price">
              <GiMoneyStack />
              <small>Total Package:</small> {backendData.totalPackage}{' '}
              <span>&#8358;</span>
            </h1>
            <b style={{ color: 'brown' }}> It costs {backendData.formprice} Points to fill form for this apartment</b>
          </div>

          <div className="apartment-info-item">
            <b> <FaWarehouse style={{ color: 'red', margin: '10px' }} /> House Specs</b>
            <ul>
              <li style={{ color: 'GrayText' }}>
                {backendData.roomCategory?.toUpperCase()} ROOM
              </li>
              <li style={{ color: 'GrayText' }}>{backendData.apartmentType.toUpperCase()}</li>
            </ul>
            <b> <FaBook style={{ color: 'darkcyan', margin: '10px' }} />Landlord Requirements are as follows</b>
            <ul>
              <li style={{ color: 'GrayText' }}>{backendData.landlordSpecs}</li>
            </ul>
          </div>
          <div className="apartment-info-item">
            <b> <FaMapMarkerAlt className="icon" style={{ color: 'brown' }} />Location </b>
            <p>{backendData.location.address}</p>
            <b style={{ color: 'yellowgreen' }}>{backendData.location.local_govt.toUpperCase()}</b>
          </div>
        </div>
      </div>
      <div className="single-apartment-map">
        <div className="map-container">
          <Map longitude={backendData.location.coordinates[0]}
            latitude={backendData.location.coordinates[1]} />
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
          {/* <textarea
            style={{ width: '500px' }}
            placeholder="Add a comment"
            value={newComment}
            onChange={handleCommentChange}
          /> */}
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



export default SingleApartment;
