import express from 'express';
import { User } from '../../models/user';

const router = express.Router();

router.get('/api/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  res.send(user)
});

export { router as getOneUserRouter }