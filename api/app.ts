import express from 'express';
import cookieParser from 'cookie-parser';
import { json } from 'body-parser';
import { currentUser, errorHandler, NotFoundError } from '@kunleticket/common'
import { createApartmentRouter } from './src/routes/apartment/create-apartment';
import 'express-async-errors'
import cookieSession from 'cookie-session';
import { updateRouter } from './src/routes/apartment/update';
import { deleteRouter } from './src/routes/apartment/delete';
import { createCommentRouter } from './src/routes/comment/new';
import { updateCommentRouter } from './src/routes/comment/update';
import { deleteCommentRouter } from './src/routes/comment/delete';
import { forgotPasswordRouter } from './src/routes/users/forgot-password';
import { signinRouter } from './src/routes/users/login';
import { signupRouter } from './src/routes/users/signup';
import { resetPasswordRouter } from './src/routes/users/reset-password';
import { updateUserRouter } from './src/routes/users/update';
import { signoutRouter } from './src/routes/users/logout';
import { getOneApartmentRouter } from './src/routes/apartment/getone';
import { getOneCommentRouter } from './src/routes/comment/getone';
import { getAllApartmentRouter } from './src/routes/apartment/getall';
import path from 'path';
import cors from 'cors'
import { reviewRouter } from './src/routes/reviews/new';
import { getAllReviewsRouter } from './src/routes/reviews/getAll';
import { createSpecRouter } from './src/routes/specs/new';
import { getAllSpecsRouter } from './src/routes/specs/getAll';
import { getOneUserRouter } from './src/routes/users/getOne';
import { currentUserRouter } from './src/routes/users/currentUser';
import { approveSpecRoute } from './src/routes/specs/update';
import { SpecNotification } from './src/routes/specs/notification';



const app = express();
app.set('trust proxy', true)

// serving static files
app.use(express.static(path.join(__dirname, 'public')));

// middlewares
app.use(json());
app.use(cookieSession({
  signed: false,
  // secure: true,
}));
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(cors())



// routes

// userroutes 
app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)
app.use(updateUserRouter)
app.use(forgotPasswordRouter)
app.use(resetPasswordRouter)
app.use(getOneUserRouter)
app.use(currentUserRouter)


// Apartment routes
app.use(createApartmentRouter)
app.use(updateRouter)
app.use(deleteRouter)
app.use(getOneApartmentRouter)
app.use(getAllApartmentRouter)

// Comment routes
app.use(createCommentRouter)
app.use(updateCommentRouter)
app.use(deleteCommentRouter)
app.use(getOneCommentRouter)
app.use(reviewRouter)
app.use(getAllReviewsRouter)

// specification router
app.use(createSpecRouter);
app.use(getAllSpecsRouter)
app.use(approveSpecRoute)
app.use(SpecNotification);

app.all('*', async () => {
  throw new NotFoundError('page not found')
})

app.use(errorHandler);


export { app }