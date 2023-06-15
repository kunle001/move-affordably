import React from 'react';
import '../../public/css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <p className="footer-text">5, Tunde Apatira Street, Akowonjo, Lagos</p>
          <p className="footer-text">Phone: (234) 70-39365725</p>
          <p className="footer-text">Email: adekunle.olanipekun.ko@gmail.com</p>
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
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-text">&copy; 2023 Moove Now. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
