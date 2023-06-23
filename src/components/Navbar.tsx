import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import axios from 'axios';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/currentUser', { withCredentials: true });
        setCurrentUser(response.data);
      } catch (error) {
        // @ts-ignore
        console.log(error.response.data.errors[0].message);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/users/logout', null, { withCredentials: true });
      setCurrentUser(null);
      window.location.reload();
    } catch (error) {
      // @ts-ignore
      console.log(error.response.data.errors[0].message);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src="../../public/images/logo.png" alt="Logo" className="logo" style={{ height: '60px', width: '60px', borderRadius: '50%' }} />
          <b style={{ color: 'rgb(41, 112, 90)' }}>MooveNow</b>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" href="/apartments">Apartments</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact-us" style={{ color: 'darkorange' }}>My Spec</a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="#">Blog</a>
            </li> */}
            {currentUser ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/my-profile">My Profile</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/my-profile" onClick={handleLogout}>Logout</a>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <a className="nav-link" href="/login">Login/Signup</a>
              </li>
            )}

            <li className="nav-item">
              <a className="nav-link" href="#">
                <FaFacebook />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <FaTwitter />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <FaInstagram />
              </a>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
