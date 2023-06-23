import { currentUser, requireAuth } from '@kunleticket/common';
import express from 'express';
import { Spec } from '../../models/specs';

const router = express.Router();

router.post('/api/specs', currentUser, requireAuth, async (req, res) => {
  const spec = Spec.build({
    user: req.currentUser!.id,
    specification: req.body.specification
  });

  await spec.save();

  res.send(spec)
});

export { router as createSpecRouter }