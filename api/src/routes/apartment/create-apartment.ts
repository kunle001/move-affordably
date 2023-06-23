import express, { Request, Response } from 'express';
// import { body } from 'express-validator'
import { Apartment } from '../../models/apartment';
import { NotAUthorizedError, currentUser, requireAuth } from '@kunleticket/common';


const router = express.Router();

router.post('/api/apartments/create', currentUser, requireAuth, async (req: Request, res: Response) => {
  // if (req.currentUser!.role !== 'admin') throw new NotAUthorizedError()

  const apartment = Apartment.build({ ...req.body });

  await apartment.save()

  res.status(201).send(apartment)

});

export { router as createApartmentRouter }