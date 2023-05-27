import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { signupRouter } from './src/routes/signup';
import { errorHandler, NotFoundError } from '@kunleticket/common'
import { signinRouter } from './src/routes/login';


const app = express();

// middlewares
app.use(cookieParser());
app.use(bodyParser.json())

// routes
app.use(signupRouter)
app.use(signinRouter)

// 
app.use('*', () => {
  throw new NotFoundError('page not found');
});
app.use(errorHandler)


export { app }