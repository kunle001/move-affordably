import express, { Request, Response } from 'express'
import { body } from 'express-validator';
import { User } from "../../models/user"
import { validateRequest, BadRequestError } from '@kunleticket/common';
import { Password } from '../../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router()

router.post('/api/users/signin', [
  body('email')
    .isEmail()
    .withMessage('message must be an email'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply a password')
], validateRequest, async (req: Request, res: Response) => {

  let { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new BadRequestError('Invalid credentials');

  const passwordMatch = await Password.compare(user.password, password)


  if (!passwordMatch) throw new BadRequestError("Invalid credentials");

  const userjwt = jwt.sign({
    id: user.id,
    email: user.email,
    image: user.image,
    phone: user.phone,
    points: user.points,
    role: user.role,
    name: user.name
  }, process.env.JWT_KEY!);

  // Store it on session
  res.cookie('secretoken', userjwt, {
    expires: new Date(
      Date.now() + 2 * 2 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  });

  res.status(200).json({
    user,
    token: userjwt
  })
});

export { router as signinRouter }