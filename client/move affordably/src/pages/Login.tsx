import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../../public/css/Login.css';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    // Reset form fields
    setEmail('');
    setPassword('');
  };

  const handleGoogleAuth = () => {
    // Implement Google authentication logic here
    console.log('Google authentication');
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="wrapper">
          <h1 className="title">LOGIN</h1>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="input"
              placeholder="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <input
              type="password"
              className="input"
              placeholder="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button className='button'>
              Login
            </button>
            <button className='button'>
              Forgot Password
            </button>
            <button className='button'>
              Signup
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>

  );
};

export default Login;
