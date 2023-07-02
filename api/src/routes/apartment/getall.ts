import express from 'express';
import { Apartment } from '../../models/apartment';

const router = express.Router();

router.get('/api/apartments', async (req, res,) => {

  const apartments = await Apartment.find();

  res.send(apartments)
});

export { router as getAllApartmentRouter }