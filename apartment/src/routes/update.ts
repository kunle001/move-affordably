import { NotFoundError, currentUser, requireAuth } from '@kunleticket/common';
import express from 'express';
import { Apartment } from '../models/apartment';

const router = express.Router()

router.patch('/api/apartments/update/:id',
  currentUser,
  // requireAuth,
  async (req, res) => {
    const apartment = await Apartment.findById(req.params.id);

    if (!apartment) throw new NotFoundError('no apartment with this id');

    apartment.set(req.body);
    await apartment.save();

    res.send(apartment)
  });

export { router as updateRouter }