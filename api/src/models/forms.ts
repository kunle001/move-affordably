import mongoose from "mongoose";

interface FormAttrs {
  user: string;
  apartment: string;
  reciepts: string;
  description?: string;
  guarantor: string;
  guarantor_phone: string;
  phone: number;
};

interface FormDocs extends mongoose.Document {
  user: string;
  apartment: string;
  reciepts: string;
  description?: string;
  guarantor: string;
  guarantor_phone: string;
  phone: number;
  createdAt: Date
};

interface FormModel extends mongoose.Model<FormDocs> {
  build(attrs: FormAttrs): FormDocs
};

const formSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  apartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Apartment'
  },
  reciept: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  description: String,
  guarantor: {
    type: String,
    required: true
  },
  guarantor_phone: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true
  }
});

formSchema.statics.build = (attrs: FormAttrs) => {
  return new Form(attrs)
};

const Form = mongoose.model<FormDocs, FormModel>(
  'Form',
  formSchema
)
export { Form }
