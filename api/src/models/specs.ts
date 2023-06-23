import mongoose from 'mongoose';


interface SpecAttrs {
  specification: string;
  user: string;
  apartment?: string[]
};

interface SpecsDocs extends mongoose.Document {
  specification: string;
  user: string;
  status: string;
  createdAt: Date;
  apartment: string[];
};

interface SpecModel extends mongoose.Model<SpecsDocs> {
  build(attrs: SpecAttrs): SpecsDocs
};

const specSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  specification: {
    type: String,
    required: [true, 'a comment must have a content']
  },
  status: {
    type: String,
    enum: ['found', 'searching', 'not found'],
    default: 'searching'
  },
  apartment: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Apartment'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: {
    virtuals: true
  }
});


specSchema.pre(/^find/, function () {
  // @ts-ignore
  this.populate({
    path: 'user',
    select: 'name image'
  })
})

specSchema.statics.build = (attrs: SpecAttrs) => {
  return new Spec(attrs)
};

const Spec = mongoose.model<SpecsDocs, SpecModel>(
  'Spec',
  specSchema
);

export { Spec }