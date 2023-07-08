import React, { useState } from 'react';
import axios from 'axios';
import '../../public/css/Contaat.css';
import { FaPhone, FaEnvelope, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Cookies from 'js-cookie';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const currentUser = Cookies.get('currentUser');
      if (!currentUser) {
        alert('You need to login to Make your request');
        window.location.href = '/login';
        return null; // Add a return statement here to prevent further rendering
      }
      // Make a POST request to the endpoint
      const response = await axios.post('http://localhost:3000/api/specs',
        {
          specification: formData.message
        }, { withCredentials: true });
      alert('Congrats: we got your response, and we will get back you!')
      window.history.back()
      // Optionally, you can show a success message or redirect the user to another page after successful submission.
    } catch (error) {
      // Handle errors if needed
      // @ts-ignore
      alert(error.response.data.errors[0].message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <p>Got something in mind? Share it with us! 😊 We'll do our best to fulfill your request within 7 working days.
            If, for any reason, we're unable to meet your exact specifications, you can submit another request or something similar.
            <b>👉 Please note that we can only accept one request at a time, so wait for our response before sending another.🤗</b>
          </p>
          <p style={{ color: 'darkorange' }}> <b>NB: Make your message clear and simple. Thank you for trusting us with your needs! 😇</b></p>
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
