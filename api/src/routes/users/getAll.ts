import { NotAUthorizedError, currentUser, requireAuth } from '@kunleticket/common';
import express from 'express';
import { User } from '../../models/user';

const router = express.Router()

router.get('/api/users', currentUser, requireAuth, async (req, res) => {
  if (req.currentUser!.role !== 'admin') {
    throw new NotAUthorizedError()
  };

  const users = await User.find();

  res.send(users)
});

export { router as getAllUsers }