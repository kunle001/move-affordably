import { currentUser, requireAuth } from '@kunleticket/common';
import express from 'express';
import { Payment } from '../../models/payment';

const router = express.Router();

router.get('/api/payments/my-transaction', currentUser, requireAuth, async (req, res) => {
  const transaction = await Payment.find({
    user: req.currentUser!.id
  });

  res.send(transaction)
});

export { router as myTransactionRouter }