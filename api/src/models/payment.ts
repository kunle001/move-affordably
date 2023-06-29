import mongoose from 'mongoose';

interface PaymentAttrs {
  user: string;
  points: string;
  transaction: 'credit' | 'debit';
  recipient?: 'form' | 'video';
  apartment?: string
};

interface PaymentDocs extends mongoose.Document {
  user: string;
  points: string;
  transaction: 'credit' | 'debit';
  recipient?: 'form' | 'video';
  apartment?: string;
  createdAt: Date
};

interface PaymentModel extends mongoose.Model<PaymentDocs> {
  build(attrs: PaymentAttrs): PaymentDocs
};

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  points: Number,
  transaction: {
    type: String,
    enum: ['credit', 'debit']
  },
  recipient: {
    type: String,
    enum: ['form', 'video']
  },
  apartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Apartment'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }

}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});

paymentSchema.statics.build = (attrs: PaymentAttrs) => {
  return new Payment(attrs)
};

const Payment = mongoose.model<PaymentDocs, PaymentModel>('Payment', paymentSchema);

export { Payment }