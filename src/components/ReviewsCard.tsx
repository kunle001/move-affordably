import React from 'react';

interface ReviewCardProps {
  name: string;
  rating: number;
  comment: string;
  imageUrl: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, rating, comment, imageUrl }) => {
  return (
    <div className="review-card">
      <div className="review-image-container">
        <img src={imageUrl} alt="Review" className="review-image" />
      </div>
      <div className="review-content">
        <div className="review-card-header">
          <h3>{name}</h3>
          <div className="rating">
            {Array.from({ length: rating }, (_, index) => (
              <span key={index} className="star">&#9733;</span>
            ))}
          </div>
        </div>
        <p className="comment">{comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
