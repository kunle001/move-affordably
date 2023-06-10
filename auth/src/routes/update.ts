import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { BadRequestError, NotFoundError, requireAuth } from '@kunleticket/common';

const router = express.Router();

router.patch('/api/users/update-profile', requireAuth, async (req: Request, res: Response) => {
  const user = await User.findById(req.currentUser!.id);

  if (!user) throw new NotFoundError('user not found');

  if (req.body.password || req.body.passwordConfirm) {
    throw new BadRequestError('cannot change password with this route')
  };

  user.set(req.body);
  await user.save();

  res.status(200).send(user);
})