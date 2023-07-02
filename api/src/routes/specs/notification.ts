import { currentUser, requireAuth } from '@kunleticket/common';
import express from 'express';
import { Spec } from '../../models/specs';

const router = express.Router();

router.get('/api/specs/notification', currentUser, requireAuth, async (req, res) => {
  let notifications = await Spec.find({
    user: req.currentUser!.id,
  });

  if (!notifications) {
    return res.send('you do not have an order to find an apartment with us');
  }

  // notifications = await Spec.find({
  //   user: req.currentUser!.id,
  //   status: 'found',
  // });

  if (!notifications) {
    return res.send('We are still Searching');
  }

  res.send(notifications);
});

export { router as SpecNotification }
