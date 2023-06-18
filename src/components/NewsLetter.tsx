import React, { useState, ChangeEvent, FormEvent } from "react";
import "../../public/css/NewsLetter.css";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Code to submit the newsletter subscription
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  return (
    <div className="newsletter-container">
      <h2 className="newsletter-title">Subscribe to Our Newsletter</h2>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          className="newsletter-input"
        />
        <button type="submit" className="newsletter-button">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
