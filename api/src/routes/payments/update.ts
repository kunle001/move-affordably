import { NotAUthorizedError, NotFoundError, currentUser, requireAuth } from '@kunleticket/common';
import express from 'express';
import { Payment } from '../../models/payment';

const router = express.Router()


router.patch('/api/payment/:id', currentUser, requireAuth, async (req, res) => {
  const payment = await Payment.findById(req.params.id);

  if (!payment) throw new NotFoundError('no transaction with this id');

  if (req.currentUser?.role !== 'admin') throw new NotAUthorizedError();

  payment.set(req.body);

  await payment.save();

  res.send(payment)
});

export { router as updatePaymentRouter }