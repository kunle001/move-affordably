import express from 'express';
import cookieParser from 'cookie-parser';
import { json } from 'body-parser';
import { currentUser, errorHandler, NotFoundError } from '@kunleticket/common'
import { createApartmentRouter } from './src/routes/create-apartment';
import 'express-async-errors'
import cookieSession from 'cookie-session';
import { updateRouter } from './src/routes/update';
import { deleteRouter } from './src/routes/delete';



const app = express();
app.set('trust proxy', true)

// middlewares
app.use(json());
app.use(cookieSession({
  signed: false,
  // secure: true,
}));
app.use(cookieParser());



// routes
app.use(createApartmentRouter)
app.use(updateRouter)
app.use(deleteRouter)

// 
app.all('*', async () => {
  throw new NotFoundError('page not found')
})

app.use(errorHandler);


export { app }