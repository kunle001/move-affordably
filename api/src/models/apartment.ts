import mongoose, { Schema, Document, Model } from "mongoose";
import { room, apartmentType } from "./roomSpec";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface ApartmentAttrs {
  location: {
    type: string;
    coordinates: number[];
    local_govt?: string;
    address?: string;
  };
  checkpoints: string[];
  annualPackage: number;
  totalPackage: number;
  distanceFromCheckPoints: number[];
  images?: [string];
  landlordSpecs: string;
  roomCategory?: room;
  apartmentType: apartmentType;
  description: string;
}

interface ApartmentDoc extends Document {
  location: {
    type: string;
    coordinates: number[];
    address: string;
    local_govt: string
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
  description: string
};


interface ApartmentModel extends Model<ApartmentDoc> {
  build(attrs: ApartmentAttrs): ApartmentDoc;
  search(searchTerm?: string, priceRange?: number, roomSpec?: string): Promise<ApartmentDoc>
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
    local_govt: String
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
  description: {
    type: String,
    required: true
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
apartmentsSchema.index({ annualPackage: 1 })
apartmentsSchema.plugin(updateIfCurrentPlugin);


apartmentsSchema.statics.build = (attrs: ApartmentAttrs) => {
  return new Apartment(attrs);
};

apartmentsSchema.statics.search = async function (searchTerm?: string, priceRange?: number, roomSpec?: string) {
  const query: any = {};

  if (searchTerm) {
    query.$or = [
      { 'location.local_govt': { $regex: searchTerm, $options: 'i' } },
      { address: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  if (priceRange) {
    query.annualPackage = { $lte: priceRange };
  }

  if (roomSpec) {
    query.apartmentType = { $eq: roomSpec }
  }

  const apartments = await this.find(query);
  return apartments;
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
