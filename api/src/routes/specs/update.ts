import express from 'express'
import { Spec } from '../../models/specs';

const router = express.Router();

router.patch('/api/specs/:id', async (req, res) => {
  const spec = await Spec.findById(req.params.id);
  spec!.set({
    status: 'found',
    apartment: spec?.apartment.push(req.body.apartment)
  });

  await spec!.save();

  res.send(spec!.populate('apartment'))
});

export { router as approveSpecRoute }