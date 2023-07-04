import React, { useState } from 'react';
import '../../public/css/Transaction.css'

interface DataProps {
  specification: string;
  date: number;
  status: 'found' | 'searching' | 'not found',
  apartment?: string[]
}

const Notification: React.FC<DataProps> = (data: DataProps) => {
  const date = new Date(data.date)

  const formattedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  });

  return (
    <div className='notification-item'>
      <div className='transaction'>
        {data.status === 'found' ? (
          <>
            <p>{data.specification}</p>
            <div className='credit'>
              {data.status}
            </div>
          </>
        ) : data.status === 'searching' ? (
          <div className='searching' >
            {data.specification}

            <p style={{ color: 'rgb(118, 101, 4)', fontWeight: 300 }}>{data.status}....</p>
          </div>
        ) : (
          <div className='debit'>
            {data.specification}
            {data.status}
          </div>
        )}
      </div>

      <>
        {data.apartment!.map((apartment, index) => (
          <a href={`/apartment/${apartment}`} style={{ gap: '2px' }}>
            apartment
          </a>
        ))}
      </>
      <span className='transaction-date'>Requested on {formattedDate}</span>

    </div>
  )
}

export default Notification;
