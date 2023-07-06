import { NotAUthorizedError, currentUser, requireAuth } from '@kunleticket/common';
import express from 'express';
import { Review } from '../../models/reviews';

const router = express.Router()

router.delete('/api/reviews/:id', currentUser, requireAuth, async (req, res) => {
  if (req.currentUser?.role !== 'admin') throw new NotAUthorizedError();

  await Review.findByIdAndDelete(req.params.id);

  res.send(`review, ${req.params.id} deleted`);
});

export { router as deleteReviewRouter }