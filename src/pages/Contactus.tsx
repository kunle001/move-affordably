import React, { useState } from 'react';
import '../../public/css/Contaat.css';
import { FaPhone, FaEnvelope, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform your submit logic here
    console.log(formData);
  };

  return (
    <>
      <Navbar />
      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <p>please make your request direct and concise, we Ensure to get you your specification
            in maximum of 7 working days, if in an unfortunate cirmumstance we are unable to get you with
            what you requested for, you can still make another request, or something similar,
          </p>
          <p style={{ color: 'darkorange' }}> <b>NB: Kindly make your message direct and simple, Thank you!</b></p>
          <div className="form-group">
            <textarea
              placeholder='message'
              id="message"
              name="message"
              className="input"
              value={formData.message}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
        <div className="contact-info">
          <div className="contact-item">
            <FaPhone className="icon" />
            <p className="text"></p>
          </div>
          <div className="contact-item">
            <FaInstagram className="icon" />
            <p className="text"></p>
          </div>
          <div className="contact-item">
            <FaTwitter className="icon" />
            <p className="text"></p>
          </div>
          <div className="contact-item">
            <FaFacebook className="icon" />
            <p className="text"></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
