import React, { useState } from 'react';
import Payment from '../components/Payment';
import Navbar from '../components/Navbar';
import Cookies from 'js-cookie';
import '../../public/css/Payment.css'
import Footer from '../components/Footer';

const BuyPoints = () => {
  const user = Cookies.get('currentUser');
  const [price, setPrice] = useState(0);

  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputPrice = parseInt(event.target.value, 10);
    if (!isNaN(inputPrice)) {
      setPrice(inputPrice);
    }
  };

  if (!user) {
    alert('You need to login to access this page');
    window.location.href = '/login';
    return null; // Add a return statement here to prevent further rendering
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="point-title">BUY FORM POINTS</h1>
        <p className="rate">1000 Naira/Point</p>
        <div className="input-container">
          <input
            type="number"
            placeholder="How many points do you want to purchase"
            onChange={handlePrice}
            required
            className="input"
          />
        </div>
        <Payment price={price} />
      </div>
      <Footer />
    </div>
  );
};

export default BuyPoints;
