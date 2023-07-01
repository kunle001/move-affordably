import React from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { useParams } from 'react-router-dom';
import { FlutterWaveResponse } from 'flutterwave-react-v3/dist/types';
import Cookies from 'js-cookie';
import '../../public/css/Payment.css'

interface User {
  email: string;
  name: string;
  image: string;
  phone: number;
  points: number
}

interface PaymentProps {
  price: number;
}

const Payment: React.FC<PaymentProps> = ({ price }) => {
  const user = Cookies.get('currentUser');
  const currentUser: User = JSON.parse(user!);
  const cost = price * 1000
  const key: string = process.env.flw_publickey!
  const config = {
    public_key: key,
    tx_ref: Date.now().toString(),
    amount: cost,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: currentUser.email,
      phone_number: '070********',
      name: currentUser.name,
    },
    customizations: {
      title: 'Buy Points Here',
      description: 'Payment for items in cart',
      logo:
        'https://th.bing.com/th/id/OIP.qkh_nRagADDF7JD5LqXhjQHaHa?pid=ImgDet&rs=1',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Buy',
    callback: (response: FlutterWaveResponse) => {
      console.log(response);
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => { },
  };

  return (
    <div className="App">
      <p><b>Welcome to Form Points, our exclusive currency on this platform. With Form Points,
        you have the power to trade and acquire various forms, including apartment forms.
        Utilize your accumulated points to purchase the form of your choice. Additionally,
        our dedicated customer care agents are available to assist you. In case you require a
        video record of the apartment you're interested in, you can conveniently pay with your
        Form Points.</b>
      </p>
      <h1 className='payment-header'>Kindly Note {currentUser.name} that you are about to pay {cost} Naira for {price} Points</h1>
      <FlutterWaveButton className='flw-payment-button' {...fwConfig} />
    </div>
  );
};

export default Payment;
