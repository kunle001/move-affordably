import mongoose, { Schema, Document, Model } from "mongoose";
import { room, apartmentType } from "./roomSpec";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface ApartmentAttrs {
  location: {
    type: string;
    coordinates: [number];
    address?: string;
    description?: string;
  };
  checkpoints: [string];
  annualPackage: number;
  totalPackage: number;
  distanceFromCheckPoints: [number];
  images?: [string];
  landlordSpecs: string;
  roomCategory?: room;
  apartmentType: apartmentType;
}

interface ApartmentDoc extends Document {
  location: {
    type: string;
    coordinates: [number];
    address?: string;
    description?: string;
  };
  checkpoints: [string];
  annualPackage: number;
  totalPackage: number;
  distanceFromCheckPoints: [number];
  images: [string];
  landlordSpecs: string;
  roomCategory?: room;
  apartmentType: apartmentType;
  createdAt: Date;
}

interface ApartmentModel extends Model<ApartmentDoc> {
  build(attrs: ApartmentAttrs): ApartmentDoc;
}

const apartmentsSchema = new Schema({
  location: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: [Number],
    address: String,
    description: String,
  },
  checkpoints: {
    type: [String],
    required: [true, "checkpoints is required"],
  },
  annualPackage: {
    type: Number,
    required: [true, "yearly pay is required"],
  },
  totalPackage: {
    type: Number,
    required: [true, "what is the total package"],
  },
  distanceFromCheckPoints: {
    type: [Number],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  landlordSpecs: String,
  roomCategory: {
    type: String,
    enum: Object.values(room),
  },
  apartmentType: {
    type: String,
    enum: Object.values(apartmentType)
  }
},
  { toJSON: { virtuals: true }, toObject: { virtuals: true } });

apartmentsSchema.index({ location: "2dsphere" });
apartmentsSchema.plugin(updateIfCurrentPlugin);


apartmentsSchema.statics.build = (attrs: ApartmentAttrs) => {
  return new Apartment(attrs);
};

apartmentsSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'apartment',
  localField: '_id'
})

const Apartment = mongoose.model<ApartmentDoc, ApartmentModel>(
  "Apartment",
  apartmentsSchema
);

export { Apartment };
