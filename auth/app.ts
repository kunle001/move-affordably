import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { signupRouter } from './src/routes/signup';
import { currentUser, errorHandler, NotFoundError } from '@kunleticket/common'
import { signinRouter } from './src/routes/login';
import { forgotPasswordRouter } from './src/routes/forgot-password';
import { resetPasswordRouter } from './src/routes/reset-password';
import { signoutRouter } from './src/routes/logout';


const app = express();

// middlewares
app.use(cookieParser());
app.use(bodyParser.json())
app.use(currentUser);


// routes
app.use(signupRouter)
app.use(signinRouter)
app.use(forgotPasswordRouter)
app.use(resetPasswordRouter)
app.use(signoutRouter)

// 
app.use('*', () => {
  throw new NotFoundError('page not found');
});
app.use(errorHandler)


export { app }