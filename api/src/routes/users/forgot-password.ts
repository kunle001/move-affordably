import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { User } from "../../models/user"
import { BadRequestError } from "@kunleticket/common";
import { Emailer } from "../../utils/emailer";


const router = express.Router()

router.post('/api/users/forgotPassword', [
  body("email").isEmail().withMessage("Email must be valid")
], async (req: Request, res: Response, next: NextFunction) => {

  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    throw new BadRequestError('no user with this email');
  }

  const resetToken = user.createPasswordResetToken()
  await user.save({ validateBeforeSave: false });

  await new Emailer(user.email, user.name!).sendPasswordReset(`${req.protocol}://${req.get('host')}/api/users/resetPassword/${resetToken}`)



  res.status(200).json({
    message: 'follow the link to reset password',
    link: `${req.protocol}://${req.get('host')}/api/users/resetPassword/${resetToken}`
  })
})

export { router as forgotPasswordRouter };
