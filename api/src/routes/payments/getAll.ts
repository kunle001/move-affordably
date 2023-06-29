import { currentUser, requireAuth } from '@kunleticket/common';
import express from 'express';
import { Payment } from '../../models/payment';

const router = express.Router();

router.get('/api/payments', currentUser, requireAuth, async (req, res) => {
  const payments = await Payment.find();

  res.send(payments)
});

export { router as getAllPayments }