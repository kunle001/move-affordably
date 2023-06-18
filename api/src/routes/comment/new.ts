import { requireAuth, currentUser, validateRequest, NotFoundError } from "@kunleticket/common";
import express from 'express';
import { Apartment } from "../../models/apartment";
import { Comment } from "../../models/comment";

const router = express.Router();

router.post('/api/comment/:apartmentId', currentUser, requireAuth, async (req, res) => {
  const apartment = await Apartment.findById(req.params.apartmentId);

  if (!apartment) throw new NotFoundError(`no apartment with id ${req.params.apartmentId}`);

  const comment = Comment.build({
    apartment: req.params.apartmentId,
    comment: req.body.comment,
    user: req.currentUser!.id
  });

  await comment.save();

  res.status(201).send(comment)
});

export { router as createCommentRouter }