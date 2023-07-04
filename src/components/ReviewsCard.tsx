import React from 'react';
import '../../public/css/ReviewCards.css';

interface ReviewCardProps {
  name: string;
  rating: number;
  comment: string;
  imageUrl: string;
  date: number; // Assuming the date is in milliseconds since the epoch (e.g., Date.now())
}

const formatDate = (date: number) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};


const ReviewCard: React.FC<ReviewCardProps> = ({ name, rating, comment, imageUrl, date }) => {
  const formattedDate = formatDate(date);

  return (
    <div className="lreview-card">
      <div className="review-content">
        <div className="review-image-container">
          <img src={imageUrl} alt="Review" className="review-image" />
          <div className="review-card-header">
            <div className='user'>{name}</div>
            <div className="rating">
              {Array.from({ length: rating }, (_, index) => (
                <span key={index} className="star">&#9733;</span>
              ))}
            </div>
          </div>
        </div>
        <p className="review-content" style={{ fontStyle: 'italic' }}>"{comment}"</p>
        <p className="review-date">Posted on {formattedDate}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
