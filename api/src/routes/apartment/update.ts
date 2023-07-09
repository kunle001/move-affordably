import { BadRequestError, NotFoundError, currentUser, requireAuth } from '@kunleticket/common';
import express, { NextFunction, Request, Response } from 'express';
import { Apartment } from '../../models/apartment';
import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs'

const router = express.Router();

const multerStorage = multer.memoryStorage();

const multerFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new BadRequestError('This is not an image'));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const uploadPicture = upload.fields([{ name: 'images', maxCount: 10 }]);

const resizeApartmentImages = async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (!req.files) return next();
  req.body.images = [];

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
  await Promise.all(
    // @ts-ignore
    req.files['images'].map(async (file: Express.Multer.File, i: number) => {
      const apartmentId = req.params.id;
      const timestamp = Date.now();
      const filename = `apartment-${apartmentId}-${timestamp}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`../public/images/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
};

router.patch(
  '/api/apartments/update/:id',
  currentUser,
  requireAuth,
  uploadPicture,
  resizeApartmentImages,
  async (req, res) => {
    const apartment = await Apartment.findById(req.params.id);
    console.log(req.body)
    if (!apartment) throw new NotFoundError('No apartment with this id');

    apartment.set(req.body);
    await apartment.save();

    res.send(apartment);
  }
);

export { router as updateRouter };