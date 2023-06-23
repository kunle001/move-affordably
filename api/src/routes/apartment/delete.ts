import { NotFoundError, currentUser, requireAuth } from '@kunleticket/common';
import express from 'express';
import { Apartment } from '../../models/apartment';
import path from 'path';
import fs from 'fs'

const router = express.Router()

router.delete('/api/apartments/delete/:id',
  currentUser,
  // requireAuth,
  async (req, res) => {
    const apartment = await Apartment.findById(req.params.id);

    if (!apartment) throw new NotFoundError('no apartment with this id');

    // Delete apartment images from directory '../../../../public/images'
    apartment.images.forEach((image) => {
      let imagePath = path.join(__dirname, '../../../../public/images', image)
      console.log(imagePath)
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
      }
    })

    await apartment.deleteOne()

    res.send(apartment)
  });

export { router as deleteRouter }