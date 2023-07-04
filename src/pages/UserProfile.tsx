import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../../public/css/UserProfile.css';
import Cookies from 'js-cookie';
import { GiMoneyStack } from 'react-icons/gi';
import Transactions from '../components/Transactions';
import Notification from '../components/Notification';

interface UserProfile {
  name: string;
  email: string;
  image: string;
  phone: number;
  points: number;
  role: string
}

interface Transaction {
  createdAt: number;
  transaction: 'credit' | 'debit';
  points: number;
  recipient: 'form' | 'video' | null;
}

interface Notifications {
  specification: string;
  createdAt: number;
  status: 'found' | 'searching' | 'not found';
  apartment?: string[];
};

interface currentUser {

}

const UserProfilePage: React.FC = () => {
  const currentUserCookie = Cookies.get('currentUser');
  const currentUser = currentUserCookie ? JSON.parse(currentUserCookie) : null;
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      createdAt: Date.now(),
      transaction: 'debit',
      points: 0,
      recipient: null,
    },
  ]);

  const [notifications, setNotifications] = useState<Notifications[]>([
    {
      specification: '',
      createdAt: Date.now(),
      status: 'searching',
      apartment: ['123'],
    },
  ]);

  const [backendData, setBackendData] = useState<UserProfile>({
    name: '',
    email: '',
    image: '',
    points: 0,
    role: '',
    phone: 0,
  });

  useEffect(() => {
    axios
      .get<UserProfile>(`http://localhost:3000/api/user/${currentUser!.id}`)
      .then((response) => {
        setBackendData(response.data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, []);

  useEffect(() => {
    const fetchNot = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/specs/notification', {
          withCredentials: true,
        });
        setNotifications(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNot();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/payments/my-transaction', {
          withCredentials: true,
        });
        setTransactions(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTransactions();
  }, []);
  const user = Cookies.get('currentUser');

  if (!user) {
    alert('You need to login to access this page');
    window.location.href = '/login';
    return null; // Add a return statement here to prevent further rendering
  }

  return (
    <>
      <Navbar />
      <div className="user-profile">
        <div className="avatar-container">
          <div className="cover"></div>
          <img className="avatar" src={`../../public/images/users/${backendData.image}`} alt="User Avatar" />
        </div>
        <h2 className="user-name">{backendData.name.toLocaleUpperCase()}</h2>
        <div className="user-info">
          <p className="user-email">Email: {backendData.email}</p>
          <b>
            <span style={{ color: 'yellowgreen' }}> Account Balance: </span>
            <GiMoneyStack className="money-bag-icon" style={{ color: 'darkgreen', cursor: 'pointer' }} />
            {backendData.points} Points
          </b>
        </div>
        <div className='nots'>
          <div className='notifications-section'>
            <h3> My Requests</h3>
            {
              notifications.map((spec, index) => (
                <Notification
                  key={index}
                  specification={spec.specification}
                  date={spec.createdAt}
                  status={spec.status}
                  apartment={spec.apartment}
                />
              ))
            }
          </div>
          <ul className='line' />
          <div className="notifications-section">
            <h3>My Transactions</h3>
            {
              transactions.map((data, index) => (
                <Transactions
                  key={index}
                  date={data.createdAt}
                  type={data.transaction}
                  amount={data.points}
                  recipient={data.recipient}

                />
              ))
            }
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfilePage;
