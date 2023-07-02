import { BadRequestError, currentUser, requireAuth } from '@kunleticket/common';
import express from 'express';
import { Spec } from '../../models/specs';

const router = express.Router();

router.post('/api/specs', currentUser, requireAuth, async (req, res) => {

  const existingSpec = await Spec.findOne({
    user: req.currentUser!.id,
    status: 'searching'
  });

  if (existingSpec) throw new BadRequestError('We are currently still working on your previous request, Please wait before sending another')


  const spec = Spec.build({
    user: req.currentUser!.id,
    specification: req.body.specification
  });



  await spec.save();

  res.send(spec)
});

export { router as createSpecRouter }