import express, { Request, Response } from 'express';
import { Apartment } from '../../models/apartment';
import { BadRequestError, NotFoundError, requireAuth } from '@kunleticket/common';
import { Payment } from '../../models/payment';
import { User } from '../../models/user';
import { body } from 'express-validator';

const router = express.Router()

router.post('/api/payment/apartment/:id', requireAuth, [
  body('recipient').not().isEmpty().withMessage('Recipient is required, is it for form or video'),
  // body('price').isFloat({ gt: 0 }).withMessage('price must be a number and greater than 0')
], async (req: Request, res: Response) => {
  const apartment = await Apartment.findById(req.params.id);
  const user = await User.findById(req.currentUser!.id)

  if (user!.points < apartment!.formprice) {
    throw new BadRequestError('sorry ☹ you do not have enough points to purchase this form ')
  }

  if (!apartment) throw new NotFoundError('no apartment with this id');

  const payment = Payment.build({
    user: req.currentUser!.id,
    transaction: 'debit',
    apartment: req.params.id,
    points: apartment.formprice,
    recipient: req.body.recipient
  });

  await payment.save();


  user!.set({
    points: user!.points - apartment.formprice
  });

  await user!.save();

  res.send(payment.populate('user'))


})