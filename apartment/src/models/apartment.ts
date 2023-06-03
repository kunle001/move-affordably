import mongoose from "mongoose";
import { room, apartmentType } from "./roomSpec";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface apartmentAttrs {
  location: string;
  checkpoints: [string];
  annualPackage: number;
  totalPackage: number;
  distanceFromCheckPoints: [number],
  images?: [string],
  landlordSpecs: string,
  roomCategory?: room,
  apartmentType: apartmentType
};

interface apartmentDocs extends mongoose.Document {
  location: string;
  checkpoints: [string];
  annualPackage: number;
  totalPackage: number;
  distanceFromCheckPoints: [number],
  images: [string],
  landlordSpecs: string,
  apartmentType: apartmentType,
  createdAt: Date
};

interface apartmentModel extends mongoose.Model<apartmentDocs> {
  build(attrs: apartmentAttrs): apartmentDocs
};

const apartmentsSchema = new mongoose.Schema({
  location: {
    type: String,
    required: [true, 'location of apartment is required']
  },
  checkpoints: {
    type: [String],
    required: [true, 'checkpoints is required']
  },
  annualPackage: {
    type: String,
    required: [true, 'yearly pay is required']
  },
  totalPackage: {
    type: Number,
    required: [true, 'what is the total package']
  },
  distanceFromCheckPoints: {
    type: [Number]
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  landlordSpecs: String,
  roomCategory: {
    type: String,
    enum: [room]
  },
  apartmentType: {
    type: String,
    enum: [apartmentType],
    required: [true, 'apartment type is required']
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id
    }
  }
});

apartmentsSchema.set('versionKey', 'version')
apartmentsSchema.plugin(updateIfCurrentPlugin);

apartmentsSchema.statics.build = (attrs: apartmentAttrs) => {
  return new Apartment(attrs);
};

const Apartment = mongoose.model<apartmentDocs, apartmentModel>('Apartment', apartmentsSchema);

export { Apartment }
