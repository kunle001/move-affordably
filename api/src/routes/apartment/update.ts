import { BadRequestError, NotFoundError, currentUser, requireAuth } from '@kunleticket/common';
import { NextFunction, Request, Response } from 'express';
import { Apartment } from '../../models/apartment';
import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';
import AWS from 'aws-sdk';
import { Router } from 'express';

const router = Router();

const multerStorage = multer.memoryStorage();
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY!,
  secretAccessKey: process.env.AWS_SECRET!,
  region: 'us-east-1'
});


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
  if (!req.files) return next();
  req.body.images = [];

  const apartmentId = req.params.id;

  try {
    // Deleting previous images in the bucket
    const listParams = {
      Bucket: 'fonetohome',
      Prefix: `apartment-${apartmentId}`
    };
    const existingObjects = await s3.listObjectsV2(listParams).promise();
    if (existingObjects.Contents!.length > 0) {
      const deleteParams = {
        Bucket: 'fonetohome',
        Delete: {
          Objects: existingObjects.Contents!.map((obj) => ({
            Key: obj.Key!
          }))
        }
      };

      await s3.deleteObjects(deleteParams).promise();

    }

    await Promise.all(
      // @ts-ignore
      req.files['images'].map(async (file: Express.Multer.File, i: number) => {
        const timestamp = Date.now();
        const filename = `apartment-${apartmentId}-${timestamp}.jpeg`;

        try {
          const resizedImageBuffer = await sharp(file.buffer)
            .resize(2000, 1333)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toBuffer();

          const params = {
            Bucket: 'fonetohome',
            Key: filename,
            Body: resizedImageBuffer,
            ContentType: 'image/jpeg',
            ACL: 'public-read'
          };

          const uploadedObject = await s3.upload(params).promise();

          req.body.images.push(uploadedObject.Location);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      })
    );
  } catch (error) {
    console.error('Error resizing images:', error);
  }

  next();
};

router.patch(
  '/api/apartments/update/:id',
  currentUser,
  requireAuth,
  uploadPicture,
  resizeApartmentImages,
  async (req: Request, res: Response) => {
    const apartment = await Apartment.findById(req.params.id);

    if (!apartment) throw new NotFoundError('No apartment with this id');

    apartment.set(req.body);
    await apartment.save();

    res.send(apartment);
  }
);

export { router as updateRouter };
