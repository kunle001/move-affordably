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
    const imagePrefix = `apartment-${req.params.id}`;
    const imageDir = path.join(__dirname, '..', '..', '..', '..', 'public', 'images');
    const files = fs.readdirSync(imageDir);
    const regex = new RegExp(`^${imagePrefix}`);

    files.forEach((file) => {
      if (regex.test(file)) {
        const imagePath = path.join(imageDir, file);
        fs.unlinkSync(imagePath)
      }
    })

    await apartment.deleteOne()

    res.send(apartment)
  });

export { router as deleteRouter }