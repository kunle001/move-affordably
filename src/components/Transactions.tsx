import React, { useState } from 'react';
import '../../public/css/Transaction.css'

interface DataProps {
  date: Date
  type: 'credit' | 'debit';
  amount: number;
  recipient: 'form' | 'video' | null
}

const Transactions: React.FC<DataProps> = (data: DataProps) => {
  const [transaction, setTransaction] = useState<DataProps>({
    date: new Date(),
    type: 'credit',
    amount: 0,
    recipient: 'form'
  });

  return (
    <div className='notification-item'>
      <div className='transaction'>
        {
          data.type === 'credit' ? (
            <div className='credit'>
              + {data.amount}
            </div>
          ) : (
            <div className='debit'>
              - {data.amount}
            </div>
          )
        }
      </div>
      <span className='transaction-date'>{data.date.toDateString()}</span>
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
