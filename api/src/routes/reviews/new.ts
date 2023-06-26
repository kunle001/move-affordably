import { currentUser, requireAuth } from '@kunleticket/common';
import { Review } from '../../models/reviews';
import express from 'express';

const router = express.Router();

router.post('/api/review', currentUser, requireAuth, async (req, res) => {
  let review = Review.build({
    user: req.currentUser!.id,
    comment: req.body.comment,
    rating: req.body.rating
  });

  await review.save();
  // review.populate('user')
  res.send(review)
});

export { router as reviewRouter }
