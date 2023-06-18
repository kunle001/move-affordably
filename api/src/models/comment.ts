import mongoose, { Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface CommentAttrs {
  comment: string;
  user: string;
  apartment: string;
};


interface CommentDocs extends mongoose.Document {
  comment: string;
  user: string;
  apartment: string;
  createdAt: Date;
};

interface CommentModel extends mongoose.Model<CommentDocs> {
  build(attrs: CommentAttrs): CommentDocs
};

const commentSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  apartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Apartment'
  },
  comment: {
    type: String,
    required: [true, 'a comment must have a content']
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id,
        delete ret._id
    }
  }
});

commentSchema.statics.build = (attrs: CommentAttrs) => {
  return new Comment(attrs);
};

const Comment = mongoose.model<CommentDocs, CommentModel>(
  'Comment',
  commentSchema
);

export { Comment }