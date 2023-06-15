import React, { useState } from 'react';
import Slider from 'react-slick';
import { FaHeart } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../public/css/Apartment.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Comment from '../components/Comment';
import Map from '../components/Map';

interface Comment {
  id: number;
  text: string;
}

const SingleApartment: React.FC = () => {
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

  const settings = {
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
          {apartmentImages.map((image) => (
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
        <h2>DESCRIPTION</h2>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          euismod, tellus sit amet varius finibus, nulla risus accumsan leo, sit
          amet ultrices mauris magna sed ex. Fusce id congue lacus. Duis semper
          augue id elementum posuere.
        </p>
        <div className="apartment-info">
          <div className="apartment-info-item">
            <h3>Apartment Price</h3>
            <p className="apartment-price">200,000 Naira/Year</p>
          </div>
          <div className="apartment-info-item">
            <h3>Amenities</h3>
            <ul>
              <li>Gym</li>
              <li>Swimming pool</li>
              <li>Parking</li>
              <li>24/7 Security</li>
            </ul>
          </div>
          <div className="apartment-info-item">
            <h3>Location</h3>
            <p>123 Main Street, City, State</p>
          </div>
        </div>
      </div>
      <div className="single-apartment-map">
        <div className="map-container">
          <Map longitude={3.3421} latitude={6.5965} />
        </div>
      </div>
      <div className="single-apartment-comments-section">
        <h2 className="comment-header">Comments</h2>
        <ul className="line"></ul>
        <Comment
          pictureUrl="../../public/images/user3.png"
          name="Kunle"
          createdAt={new Date(Date.now()).toLocaleString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        >
          I love this Apartment
        </Comment>
        <Comment
          pictureUrl="../../public/images/user2.png"
          name="Tobi"
          createdAt={new Date(Date.now()).toLocaleString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        >
          I am really Enjoying the view
        </Comment>
        <Comment
          pictureUrl="../../public/images/user1.png"
          name="Ade"
          createdAt={new Date(Date.now()).toLocaleString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        >
          Sweet, how can I get this place?
        </Comment>
        <Comment
          pictureUrl="../../public/images/user1.png"
          name="Ade"
          createdAt={new Date(Date.now()).toLocaleString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        >
          Please, I want to make payment.
        </Comment>
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

export default SingleApartment;
