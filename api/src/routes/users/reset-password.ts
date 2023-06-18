import express, { Request, Response } from 'express';
import "cookie-session"
import { BadRequestError, validateRequest } from '@kunleticket/common';
import { User } from "../../models/user"
import crypto from 'crypto';

const router = express.Router();

router.patch('/api/users/resetPassword/:token', async (req: Request, res: Response) => {
  const tokens = req.params.token


  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: new Date(Date.now()) },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    throw new BadRequestError('token is invalid or has expired')
  }

  if (req.body.password !== req.body.passwordConfirm) {
    throw new BadRequestError('passwords and confirm_password do not match')
  }
  console.log(req.body.password, req.body.confirmPassword)
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  res.status(200).send(user);

});

export { router as resetPasswordRouter };
