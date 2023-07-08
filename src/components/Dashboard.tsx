import React from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  date: number;
  profilePhoto: string;
}

interface Transaction {
  id: number;
  amount: number;
  date: string;
}

const Dashboard: React.FC = () => {
  // Dummy data for new users and transactions
  const newUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      date: Date.now(),
      profilePhoto: 'default.png',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      date: Date.now(),
      profilePhoto: 'user2.jpg',
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert@example.com',
      date: Date.now(),
      profilePhoto: 'user3.jpg',
    },
    // Add more users here
  ];

  const transactions: Transaction[] = [
    { id: 1, amount: 100, date: '2023-07-04' },
    { id: 2, amount: 250, date: '2023-07-03' },
    { id: 3, amount: 50, date: '2023-07-02' },
    // Add more transactions here
  ];

  const formatDate = (dateString: number) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const options = { hour: '2-digit', minute: '2-digit', hour12: true };

    if (date.toDateString() === today.toDateString()) {
      return `Joined today at ${date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Joined yesterday at ${date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })}`;
    } else {
      return date.toLocaleString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }
  };


  return (
    <section className="">

      <div className='upper'>
        <h2>New Users</h2>
        <ul className="user-list">
          {newUsers.map((user) => (
            <li key={user.id} className="user-item">
              <img className="user-avatar" src={`../../public/images/users/${user.profilePhoto}`} alt={user.name} />
              <div className="user-info">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <span className="date">{formatDate(user.date)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul />
        <h2>Today's Transactions</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              ${transaction.amount} - {transaction.date}
            </li>
          ))}
        </ul>
      </div>
      <ul style={{ height: '20px' }} />
      <div>
        <h2>Todays requests</h2>
        <ul className="message-list">
          <li>
            <div className="message-item">
              <div className="message-avatar">
                {/* You can add an image for the sender's avatar */}
              </div>
              <div className="message-content">
                <h4>Message from Tobi</h4>
                <p>I need a Single room around ikeja?</p>
                <span className="date">{formatDate(Date.now())}</span>
              </div>
            </div>
          </li>
          <li>
            {/* Add more message items here */}
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Dashboard;
