import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import '../../public/css/Login.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { response } from 'express';

const LoginPage: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleFormSwitch = () => {
    setActiveForm(prevForm => (prevForm === 'signin' ? 'signup' : 'signin'));
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/api/users/${activeForm}`, {
        email,
        password,
        confirmPassword
      });

      console.log('Login or signup successful');
      console.log('Response:', response.data);

      // Reset form fields
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Reload the previous page
      window.history.back();
    } catch (error) {
      // @ts-ignore
      console.error('Error:' + error.response.data);
    }
  };

  return (
    <>
      <div className="login-page">
        <Navbar />
        <div className="login-container">
          <div className="form-container">
            <h2 className="form-title">{activeForm === 'signin' ? 'Login' : 'Sign Up'}</h2>
            <form className="form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {activeForm === 'signup' && (
                <input
                  type="password"
                  className="input"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              )}
              <button type="submit" className="submit-button">
                {activeForm === 'signin' ? 'Login' : 'Sign Up'}
              </button>
            </form>
            <p className="form-switch" onClick={handleFormSwitch}>
              {activeForm === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Login'}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
