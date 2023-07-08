import React, { useState, useEffect } from 'react';
import axios from 'axios';


interface User {
  name: string;
  image: string;
  phone: number;
  points: number;
  id: string;
  createdAt: number;
  email: string
}

const Users: React.FC = () => {
  const [backendData, setBackendData] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/users', {
        withCredentials: true,
      })
      .then((res) => {
        setBackendData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ borderRadius: '2px' }}>
      <span>{backendData.length} Users</span>
      <table className="user-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Account balance(Points)</th>
            <th>Email</th>
            <th> User ID</th>
            <th>Date Joined</th>
          </tr>
        </thead>
        <tbody>
          {backendData.map((data, index) => (
            <tr key={index}>
              <td>
                <img className="user-image" src={`../../public/images/users/${data.image}`} alt={`User ${data.name}`} />
              </td>
              <td><b style={{ color: 'darkcyan' }}>{data.name.toUpperCase()}</b></td>
              <td>{data.phone}</td>
              <td>{data.points}</td>
              <td>{data.email}</td>
              <td>{data.id}</td>
              <td>{new Date(data.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
