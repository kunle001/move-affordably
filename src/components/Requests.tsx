import axios from 'axios';
import React, { useEffect, useState } from 'react';

import '../../public/css/Request.css'; // Import the CSS file for styling

interface requestProps {
  specification: string;
  user: {
    name: string,
    phone: number,
    email: string,
    points?: number,
    id: string,
    image: string
  };
  status: string;
  apartment?: string[];
  id: string;
  createdAt: number;
}

const Requests = () => {
  const [requests, setRequest] = useState<requestProps[]>([{
    specification: '',
    user: {
      name: '',
      phone: +234,
      email: '',
      id: '',
      image: 'default.png'
    },
    status: '',
    id: '',
    createdAt: Date.now()
  }]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/specs')
      .then((res) => {
        setRequest(res.data)
      })
  }, [{}])

  return (
    <div className="requests-container">
      <div className="request-items">
        {
          requests.map((request, index) => (
            <div className="request-item" key={index}>
              <h1>{request.user.name}</h1>
              <span>{request.user.email}</span>
              <span>{request.id}</span>
              <img src={`../../public/images/users/${request.user.image}`} alt="User" />
              <p>{request.specification}</p>
              <div className='req-apartment'>
                {
                  request.apartment?.map((apartment, index) => (
                    <div  >
                      <a href={`/apartment/${apartment}`}>apartment {index + 1}</a>
                    </div>
                  ))

                }
              </div>
              {
                request.status === 'found' ?
                  <b style={{ color: 'green', fontStyle: 'unset', fontWeight: 800 }}>{request.status}</b> :
                  request.status === 'searching' ?
                    <b style={{ color: 'orange' }}>{request.status}</b> :
                    <b style={{ color: 'red' }}>{request.status}</b>
              }
              <span>Requested on {new Date(request.createdAt).toLocaleDateString(
                'en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
              })}</span>


            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Requests
