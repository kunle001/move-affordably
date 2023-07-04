import React, { useState } from 'react';
import '../../public/css/Transaction.css'

interface DataProps {
  date: number
  type: 'credit' | 'debit';
  amount: number;
  recipient: 'form' | 'video' | null
}

const Transactions: React.FC<DataProps> = (data: DataProps) => {
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
        {
          data.type === 'credit' ? (
            <div className='credit'>
              + {data.amount} Points
            </div>
          ) : (
            <div className='debit'>
              - {data.amount} Points
            </div>
          )
        }
      </div>
      <span className='transaction-date'>{formattedDate}</span>
      {
        data.recipient && (
          <div>
            {data.recipient}
          </div>
        )
      }

    </div>
  )
}

export default Transactions
