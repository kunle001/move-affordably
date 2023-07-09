import { NotAUthorizedError, NotFoundError, PoemStatus, requireAuth, BadRequestError } from '@kunleticket/common';
import express, { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';

const router = express.Router();

const s3 = new aws.S3({
  // Configure your AWS credentials and region
  accessKeyId: 'YOUR_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  region: 'YOUR_AWS_REGION',
});

const multerFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new BadRequestError('This is not an image'));
  }
};

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'YOUR_S3_BUCKET_NAME',
    acl: 'public-read', // Set appropriate ACL permissions
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const imagePrefix = `apartment-${req.params.id}`;
      const apartmentId = req.params.id;
      const timestamp = Date.now();
      const filename = `apartment-${apartmentId}-${timestamp}.jpeg`;
      cb(null, filename);
    },
  }),
  fileFilter: multerFilter,
});

const uploadPicture = upload.fields([{ name: 'images', maxCount: 10 }]);

const resizeApartmentImages = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.files) return next();
  req.body.images = [];

  await Promise.all(
    req.files['images'].map(async (file: Express.Multer.File, i: number) => {
      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toBuffer(async (err, data, info) => {
          if (err) throw err;
          const params = {
            Bucket: 'YOUR_S3_BUCKET_NAME',
            Key: info.filename,
            Body: data,
            ContentType: 'image/jpeg',
            ACL: 'public-read', // Set appropriate ACL permissions
          };
          await s3.upload(params).promise();
          req.body.images.push(info.filename);
        });
    })
  );

  next();
};

router.patch('/api/poems/update/:id', requireAuth, async (req: Request, res: Response) => {
  const poem = await Poem.findById(req.params.id);

  if (!poem) throw new NotFoundError('Poem is not found');

  if (req.currentUser!.id !== poem.userId && req.currentUser!.role !== 'admin') throw new NotAUthorizedError();

  if (req.currentUser!.id === poem.userId) {
    // Reset the poem status to pending 
    poem.set({ ...req.body, status: PoemStatus.Pending });
  } else {
    // If admin edits the poem, update it all
    if (req.body.status && req.currentUser!.role !== 'admin') throw new NotAUthorizedError();
    poem.set(req.body);
  }
  await poem.save();

  new PoemUpdatedPublisher(poem.id);

  res.status(200).json({
    poem,
  });
});

export { router as updatePoem };
