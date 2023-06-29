import { currentUser, requireAuth } from '@kunleticket/common';
import express from 'express';
import { Payment } from '../../models/payment';
import { User } from '../../models/user';

const router = express.Router();

router.post('/api/payment', currentUser, requireAuth, async (req, res) => {
  const { points, transaction, recipient, apartment } = req.body;
  const payment = Payment.build({
    user: req.currentUser!.id,
    points,
    transaction,
    recipient,
    apartment,
  });

  const user = await User.findById(req.currentUser!.id);

  user!.set({ points: user!.points + points });
  await user!.save();

  await payment.save();
  await payment.populate('user')

  res.status(201).json(payment);
});

export { router as createPaymentRouter };
