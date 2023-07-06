import { NotAUthorizedError, currentUser, requireAuth } from '@kunleticket/common';
import express from 'express';
import { User } from '../../models/user';

const router = express.Router()

router.delete('/api/users/:id', currentUser, requireAuth, async (req, res) => {
  if (req.currentUser?.role !== 'admin') throw new NotAUthorizedError();

  await User.findByIdAndDelete(req.params.id);

  res.send(`user, ${req.params.id} deleted`);
});

export { router as deleteUserRouter }