import express, { NextFunction, Request, Response } from 'express';
import { User } from '../../models/user';
import {
  BadRequestError,
  NotFoundError,
  currentUser,
  requireAuth,
} from '@kunleticket/common';
import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const multerStorage = multer.memoryStorage();

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new BadRequestError('This is not an image'));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadPhoto = upload.single('picture');

const resizeUserImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) return next();

  const previousImage = req.currentUser!.image;

  // Delete previous profile pictures with matching prefix
  const imagePrefix = `user-${req.currentUser!.id}`;
  const imageDir = path.join(__dirname, '..', '..', '..', '..', 'public', 'images', 'users');
  const files = fs.readdirSync(imageDir);
  const regex = new RegExp(`^${imagePrefix}`);

  files.forEach((file) => {
    if (regex.test(file)) {
      const imagePath = path.join(imageDir, file);
      fs.unlinkSync(imagePath);
    }
  });

  req.file.filename = `user-${req.currentUser!.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(path.join(imageDir, req.file.filename));

  req.body.image = req.file.filename;

  next();
};

router.patch(
  '/api/users/update-profile',
  currentUser,
  requireAuth,
  uploadPhoto,
  resizeUserImage,
  async (req: Request, res: Response) => {
    const user = await User.findById(req.currentUser!.id);

    if (!user) throw new NotFoundError('User not found');

    if (req.body.password || req.body.passwordConfirm) {
      throw new BadRequestError('Cannot change password with this route');
    }

    user.set(req.body);
    await user.save();

    res.status(200).send(user);
  }
);

export { router as updateUserRouter };
