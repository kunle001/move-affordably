import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../../public/css/UserProfile.css';
import Cookies from 'js-cookie';

interface UserProfile {
  name: string;
  email: string;
  image: string;
}

interface Order {
  id: string;
  status: 'Cancelled' | 'Approved';
  productName: string;
  quantity: number;
  // Other order properties
}

interface Notification {
  id: string;
  message: string;
  // Other notification properties
}

const UserProfilePage: React.FC = () => {
  const currentUserCookie = Cookies.get('currentUser');
  const currentUser = currentUserCookie ? JSON.parse(currentUserCookie) : null

  const [backendData, setBackendData] = useState<UserProfile>({
    name: '',
    email: '',
    image: ''
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    axios
      .get<UserProfile>(`http://localhost:3000/api/user/${currentUser!.id}`)
      .then((response) => {
        setBackendData(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });

    // Fetch orders (dummy data)
    const dummyOrders: Order[] = [
      {
        id: '1',
        status: 'Cancelled',
        productName: 'Product A',
        quantity: 2
      },
      {
        id: '2',
        status: 'Approved',
        productName: 'Product B',
        quantity: 1
      },
      {
        id: '3',
        status: 'Cancelled',
        productName: 'Product C',
        quantity: 3
      }
    ];
    setOrders(dummyOrders);

    // Fetch notifications (dummy data)
    const dummyNotifications: Notification[] = [
      {
        id: '1',
        message: 'You have a new order!'
      },
      {
        id: '2',
        message: 'Payment successful'
      },
      {
        id: '3',
        message: 'Your order has been shipped'
      }
    ];
    setNotifications(dummyNotifications);
  }, []);

  return (
    <>
      <Navbar />
      <div className="user-profile">
        <div className="avatar-container">
          <div className="blur-background"></div>
          <img className="avatar" src={`../../public/images/${backendData.image}`} alt="User Avatar" />
        </div>
        <div className="user-info">
          <h2 className="user-name">{backendData.name}</h2>
          <p className="user-email">{backendData.email}</p>
        </div>
        <div className="orders-section">
          <h3>My Orders</h3>
          <div className="order-list">
            <div className="order-category">
              <h4>Cancelled Orders</h4>
              {orders
                .filter((order) => order.status === 'Cancelled')
                .map((order) => (
                  <div key={order.id} className="order-item">
                    <h5>{order.productName}</h5>
                    <p>Quantity: {order.quantity}</p>
                    {/* Display additional order information */}
                  </div>
                ))}
            </div>
            <div className="order-category">
              <h4>Approved Orders</h4>
              {orders
                .filter((order) => order.status === 'Approved')
                .map((order) => (
                  <div key={order.id} className="order-item">
                    <h5>{order.productName}</h5>
                    <p>Quantity: {order.quantity}</p>
                    {/* Display additional order information */}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="notifications-section">
          <h3>Notifications</h3>
          {notifications.map((notification) => (
            <div key={notification.id} className="notification-item">
              <p>{notification.message}</p>
              {/* Display additional notification information */}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfilePage;
