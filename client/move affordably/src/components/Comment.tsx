import React from 'react';
import '../../public/css/Comment.css';

interface CommentProps {
  name: string;
  pictureUrl: string;
  children: string;
  createdAt: string;
}

const Comment: React.FC<CommentProps> = ({ name, pictureUrl, children, createdAt }) => {
  return (
    <div className="comment-container">
      <div className="user-info">
        <img className="user-picture" src={pictureUrl} alt="User" />
        <div className="user-details">
          <div className="user-header">
            <span className="user-name">{name}</span>
            <span className="comment-date">{createdAt}</span>
          </div>
          <p className="comment-content">{children}</p>
        </div>
      </div>
    </div>
  );
};





export default Comment;
