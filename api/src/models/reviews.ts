import mongoose from 'mongoose';

interface ReviewsAttrs {
  user: string;
  comment: string;
  rating: number;
};

interface ReviewDocs extends mongoose.Document {
  user: string;
  comment: string;
  rating: number;
  createdAt: Date;
};

interface ReviewModel extends mongoose.Model<ReviewDocs> {
  build(attrs: ReviewsAttrs): ReviewDocs
};

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: {
    type: String,
    required: [true, 'a comment is requiired for review']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  rating: Number
}, {
  toJSON: {
    virtuals: true
  }
});

reviewSchema.pre(/^find/, function () {
  // @ts-ignore
  this.populate({
    path: 'user',
    select: 'name image'
  })
})

reviewSchema.statics.build = (attrs: ReviewsAttrs) => {
  return new Review(attrs);
};

const Review = mongoose.model<ReviewDocs, ReviewModel>(
  'Review',
  reviewSchema
);

export { Review }