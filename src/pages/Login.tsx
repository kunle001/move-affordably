import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import '../../public/css/Login.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { response } from 'express';
import Cookies from 'js-cookie';

const LoginPage: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setConfirmPassword] = useState('');


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
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value)
  }

  const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/api/users/${activeForm}`, {
        name,
        email,
        password,
        passwordConfirm,
        phone
      },
        { withCredentials: true });

      alert('Signed Up Successfully');


      Cookies.set(
        'currentUser',
        JSON.stringify({
          name: response.data.user.name,
          id: response.data.user.id,
          role: response.data.user.role,
          email: response.data.user.email,
          image: response.data.user.image,
          points: response.data.user.points,
          phone: response.data.user.phone
        }),
        { expires: 7 }
      );
      alert('Congratulations You are signed up')
      // console.log('Response:', response.data);

      // Reset form fields
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      window.history.back();
    } catch (err) {
      // @ts-ignore
      alert(err.response.data.errors[0].message);
    }
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/api/users/${activeForm}`, {
        email: email,
        password: password,
      },
        { withCredentials: true });

      alert('Logged in Successfully');

      // Cookies.set('secretoken', response.data.token, { expires: 7 });
      Cookies.set(
        'currentUser',
        JSON.stringify({
          name: response.data.user.name,
          id: response.data.user.id,
          role: response.data.user.role,
          email: response.data.user.email,
          image: response.data.user.image,
          points: response.data.user.points,
          phone: response.data.user.phone
        }),
        { expires: 7 }
      );

      console.log('Response:', response.data);

      // Reset form fields
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      window.history.back();
    } catch (error) {
      // @ts-ignore
      alert(error.response.data.errors[0].message);
    }
  };


  return (
    <>
      <div className="login-page">
        <Navbar />
        <div className="login-container">
          <div className="form-container">
            <h2 className="form-title">{activeForm === 'signin' ? 'Login' : 'Sign Up'}</h2>
            <form className="form" onSubmit={activeForm === 'signin' ? handleLogin : handleSignup}>
              {activeForm === 'signup' && (
                <input
                  type="text"
                  className="input"
                  placeholder="Your Name"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              )}
              {activeForm === 'signup' && (
                <input
                  type="text"
                  className="input"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                />
              )}
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
                  value={passwordConfirm}
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
