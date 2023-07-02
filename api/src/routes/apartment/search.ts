import express from 'express';
import { Apartment } from '../../models/apartment';

const router = express.Router()

router.post('/api/search/apartment', async (req, res) => {
  const { searchTerm, priceRange, roomSpec } = req.body

  const apartment = await Apartment.search(searchTerm, priceRange, roomSpec);

  res.send(apartment)
});

export { router as searchApartmentRouter }