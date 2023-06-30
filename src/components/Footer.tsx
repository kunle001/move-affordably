import React from 'react';
import '../../public/css/Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <div className="footer-item">
            <FaMapMarkerAlt className="icon" style={{ color: 'brown' }} />
            <p className="footer-text">5, Tunde Apatira Street, Akowonjo, Lagos</p>
          </div>
          <div className="footer-item">
            <FaPhone className="icon" style={{ color: 'darkgreen' }} />
            <p className="footer-text">Phone (234) 81-20070611</p>
          </div>
          <div className="footer-item">
            <FaEnvelope style={{ color: 'darkblue' }} />
            <p className="footer-text"> <b>wolcenterprise@gmail.com</b></p>
          </div>
        </div>
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-heading">Connect with Us</h3>
          <div className="social-icons">
            <a href="#"><FaFacebook className="icon" /></a>
            <a href="https://twitter.com/fonetohome"><FaTwitter className="icon" /></a>
            <a href="https://instagram.com/fonetohome?igshid=MzRlODBiNWFlZA=="><FaInstagram className="icon" /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-text">&copy; 2023 FoneToHome. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
