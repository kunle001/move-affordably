import express from 'express';
import { Apartment } from '../../models/apartment';
import { Comment } from '../../models/comment';

const router = express.Router();

router.get('/api/comment/:id', async (req, res) => {
  const comment = await Comment.findById(req.params.id).populate('apartment', '-location')

  res.send(comment)
});



export { router as getOneCommentRouter }