import express from 'express'
import { Spec } from '../../models/specs';

const router = express.Router();

router.patch('/api/specs/:id', async (req, res) => {
  const spec = await Spec.findById(req.params.id);
  spec!.set({ status: 'not found' });

  await spec!.save();

  res.send(spec)
});

export { router as approveSpecRoute }