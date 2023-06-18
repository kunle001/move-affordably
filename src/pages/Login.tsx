import React, { useState } from 'react';
import '../../public/css/Login.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LoginPage: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleFormSwitch = () => {
    setActiveForm(prevForm => (prevForm === 'login' ? 'signup' : 'login'));
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform login or signup logic here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    // Reset form fields
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <>
      <div className="login-page">
        <Navbar />
        <div className="login-container">
          <div className="form-container">
            <h2 className="form-title">{activeForm === 'login' ? 'Login' : 'Sign Up'}</h2>
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
                {activeForm === 'login' ? 'Login' : 'Sign Up'}
              </button>
            </form>
            <p className="form-switch" onClick={handleFormSwitch}>
              {activeForm === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Login'}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
