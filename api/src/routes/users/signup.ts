import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from "../../models/user"
import { BadRequestError, validateRequest } from '@kunleticket/common'
import { Emailer } from '../../utils/emailer';


const router = express.Router();

router.post('/api/users/signup', [
  body("email").isEmail().withMessage('provide a valid email please'),
  body('password').trim().isLength({ min: 8, max: 20 }).withMessage('provide a password'),
  body('passwordConfirm').trim().isLength({ min: 8, max: 20 }).withMessage('please confirm your password')
], validateRequest, async (req: Request, res: Response) => {

  const { email, name, phone, password, passwordConfirm } = req.body

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError('this mail is already in use');
  };

  if (password !== passwordConfirm) {
    throw new BadRequestError('please reconfirm your password');
  };

  const user = User.build({
    email,
    name,
    phone,
    password,
    passwordConfirm
  });

  await user.save();

  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name
    },
    process.env.JWT_KEY!
  );

  req.session = {
    jwt: userJwt,
  };

  await new Emailer(user.email, user.name!).sendWelcome()

  res.status(201).send(user)
});

export { router as signupRouter }


