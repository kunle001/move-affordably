import express from 'express';
import { Spec } from '../../models/specs';

const router = express.Router();

router.get('/api/specs', async (req, res) => {
  const specs = await Spec.find();

  res.send(specs)
});

export { router as getAllSpecsRouter }