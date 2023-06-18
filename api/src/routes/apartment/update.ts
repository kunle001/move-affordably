import { BadRequestError, NotFoundError, currentUser, requireAuth } from '@kunleticket/common';
import express, { NextFunction, Request, Response } from 'express';
import { Apartment } from '../../models/apartment';
import multer from 'multer';
import sharp from 'sharp';
import mongoose from 'mongoose';

const router = express.Router();

const multerStorage = (apartment?: mongoose.Document) => {

  const store = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, ' ../../../../public/images/')
    },
    filename: (req, file, cb) => {
      cb(null, `apartment-${Date.now})}`)
    }
  });
  return store
};

const multerfilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    throw new BadRequestError('this is not an image!')
  }
};

const upload = multer({
  storage: multerStorage(),
  fileFilter: multerfilter
});

const uploadPicture = upload.fields([
  { name: 'images', maxCount: 10 }
]);

const resizeApartmentImages = async (req: Request, res: Response, next: NextFunction) => {

  // 2) Images
  req.body.images = [];

  await Promise.all(
    // @ts-ignore
    req.files.images.map(async (file: Express.Multer.File, i: number) => {
      const filename = `apartment-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`../../../../public/images/${filename}`);

      req.body.images.push(filename);
    })
  );


  next();
};



router.patch('/api/apartments/update/:id',
  currentUser,
  // requireAuth,
  uploadPicture,
  resizeApartmentImages,
  async (req, res) => {
    const apartment = await Apartment.findById(req.params.id);

    if (!apartment) throw new NotFoundError('no apartment with this id');

    apartment.set(req.body);
    await apartment.save();

    res.send(apartment)
  });

export { router as updateRouter }