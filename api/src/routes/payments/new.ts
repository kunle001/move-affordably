import { currentUser, requireAuth } from '@kunleticket/common';
import express from 'express';
import { Payment } from '../../models/payment';
import { User } from '../../models/user';
import jwt from 'jsonwebtoken'

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

  const userjwt = jwt.sign({
    id: user!.id,
    email: user!.email,
    image: user!.image,
    phone: user!.phone,
    points: user!.points,
    role: user!.role,
    name: user!.name
  }, process.env.JWT_KEY!);

  // Store it on session
  res.cookie('secretoken', userjwt, {
    expires: new Date(
      Date.now() + 2 * 2 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  });


  await payment.save();
  await payment.populate('user')

  res.status(201).json(payment);
});

export { router as createPaymentRouter };
