import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../public/css/ATransactions.css';

interface Transactions {
  user: {
    name: string;
    id: string;
    email: string;
    phone: number;
    points: number;
    image: string;
  };
  points: number;
  transaction: 'credit' | 'debit';
  recipient?: 'form' | 'video';
  apartment?: {
    location: {
      address: string;
      local_govt: string;
      coordinates: string;
    };
  };
  createdAt: number;
}

const Transaction = () => {
  const [transactions, setTransaction] = useState<Transactions[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/payments', { withCredentials: true })
      .then((res) => {
        setTransaction(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="admin-transaction">
      <h2 className="admin-transaction-title">Transaction History</h2>
      {transactions.map((transaction, index) => (
        <div key={index} className="admin-transaction-item">
          <div className="admin-transaction-item-header">
            <img src={`../../public/images/users/${transaction.user.image}`} alt="User" className="admin-transaction-item-avatar" />
            <div>
              <h3 className="admin-transaction-item-name">{transaction.user.name}</h3>
              <p className="admin-transaction-item-email">{transaction.user.email}</p>
              <p className="admin-transaction-item-phone">Phone: {transaction.user.phone}</p>
            </div>
          </div>
          <div className="admin-transaction-item-details">
            <div className="admin-transaction-item-points">
              <p className="admin-transaction-item-label">Points:</p>
              <p className="admin-transaction-item-value">{transaction.points}</p>
            </div>
            <div className="admin-transaction-item-location">
              <p className="admin-transaction-item-label">Location:</p>
              <p className="admin-transaction-item-value">
                {transaction.apartment?.location.address}, {transaction.apartment?.location.local_govt}
              </p>
            </div>
            <div className={`admin-transaction-item-recipient ${transaction.transaction === 'credit' ? 'credit' : ''}`}>
              <p className="admin-transaction-item-label">Recipient:</p>
              <p className="admin-transaction-item-value">{transaction.recipient}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Transaction;
