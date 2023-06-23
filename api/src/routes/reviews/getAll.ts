import express from 'express';
import { Review } from '../../models/reviews';

const router = express.Router();

router.get('/api/reviews', async (req, res) => {
  const reviews = await Review.find();

  res.send(reviews)
});

export { router as getAllReviewsRouter }