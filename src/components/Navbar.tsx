import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaShoppingBag } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'js-cookie';

interface CurrentUser {
  email: string;
  id: string;
  role: 'admin' | 'user';
  image?: string;
  points: number,
  phone: number,
}

const Navbar: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);



  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = JSON.parse(Cookies.get('currentUser')!)
        setCurrentUser(response);

      } catch (error) {
        // @ts-ignore
        console.log(error.response.data.errors[0].message);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {

  }, [currentUser]);
  const handleLogout = async () => {
    try {
      await axios.get('http://127.0.0.1:3000/api/users/signout')
      Cookies.remove('secretoken');
      Cookies.remove('currentUser');

    } catch (error) {
      // @ts-ignore
      console.log(error.response.data.errors[0].message);
    }
  };

  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src="../../public/images/logo.png" alt="Logo" className="logo" style={{ height: '40px', width: '40px', borderRadius: '50%' }} />
          <b style={{ color: 'rgb(41, 112, 90)' }}>FonetoHome</b>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/apartments">Apartments</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact-us" style={{ color: 'darkorange' }}>My Spec</a>
            </li>
            {currentUser ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/my-profile">My Profile</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/" onClick={handleLogout}>Logout</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/buy-points">Buy Points</a>
                </li>
                {
                  // @ts-ignore

                  currentUser?.role === 'admin' && (
                    <li className='nav-item'>
                      <a className='nav-link' href='/admin'>Admin Panel</a>
                    </li>
                  )}
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
              <a className="nav-link" href="https://twitter.com/fonetohome">
                <FaTwitter />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://instagram.com/fonetohome?igshid=MzRlODBiNWFlZA==">
                <FaInstagram />
              </a>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search by location" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
