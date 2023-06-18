import express from 'express';
import { Apartment } from '../../models/apartment';

const router = express.Router();

router.get('/api/apartment/:id', async (req, res) => {
  const apartment = await Apartment.findById(req.params.id).populate('comments')

  res.send(apartment)
});



export { router as getOneApartmentRouter }