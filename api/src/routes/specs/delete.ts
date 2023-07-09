import { NotAUthorizedError, currentUser, requireAuth } from '@kunleticket/common';
import express from 'express';
import { Spec } from '../../models/specs';

const router = express.Router()

router.delete('/api/specs/delete/:id', currentUser, requireAuth, async (req, res) => {
  if (req.currentUser?.role !== 'admin') throw new NotAUthorizedError();

  await Spec.findByIdAndDelete(req.params.id);

  res.send(`spec, ${req.params.id} deleted`);
});

export { router as deleteSpecsRouter } 