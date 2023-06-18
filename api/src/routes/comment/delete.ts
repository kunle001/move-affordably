import { requireAuth, currentUser, validateRequest, NotFoundError, NotAUthorizedError } from "@kunleticket/common";
import express from 'express';
import { Apartment } from "../../models/apartment";
import { Comment } from "../../models/comment";

const router = express.Router();

router.delete('/api/comment/:id', currentUser, requireAuth, async (req, res) => {
  const comment = await Comment.findById(req.params.id).populate('user');

  if (!comment) throw new NotFoundError(`no apartment with id ${req.params.id}`);
  // @ts-ignore
  if (req.currentUser!.id !== comment.user.id) throw new NotAUthorizedError()

  await comment.deleteOne()

  res.send('deleted successfully')
});

export { router as deleteCommentRouter }