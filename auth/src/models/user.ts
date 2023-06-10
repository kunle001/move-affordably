import mongoose from "mongoose";
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import bcrypt from 'bcrypt'
import crypto from 'crypto'

interface userAttrs {
  name: string;
  email: string;
  image?: string;
  password: string;
  passwordConfirm: string;
};

interface userDocs extends mongoose.Document {
  name: string;
  email: string;
  image: string;
  password: string;
  passwordConfirm: string;
  passwordChangedAt?: Date;
  createdAt: Date;
  passwordResetToken: string,
  role: string,
  passwordResetExpires: Date,
  correctPassword: (inputPassword: string, savedPassword: string) => Promise<boolean>;
  changedPasswordAfter: (JWTtimestamp: number) => boolean;
  createPasswordResetToken: () => any
};

interface userModel extends mongoose.Model<userDocs> {
  build(attrs: userAttrs): userDocs;
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'provide an email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'you need a password to signup']
  },
  passwordChangedAt: mongoose.Schema.Types.Date,
  passwordResetToken: String,
  passwordResetExpires: mongoose.Schema.Types.Date,
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  createdAt: {
    type: mongoose.Schema.Types.Date,
    default: Date.now
  },


}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.passwordConfirm
      delete ret.password
      delete ret.passwordResetToken
      delete ret.passwordResetExpires
    }
  }
});

userSchema.set('versionKey', 'version')
userSchema.plugin(updateIfCurrentPlugin);

userSchema.statics.build = (attrs: userAttrs) => {
  return new User(attrs);
};

userSchema.pre('save', async function (next) {

  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);

  next();
})

userSchema.methods.correctPassword = async function (
  inputPassword: string,
  savedPassword: string
) {
  return await bcrypt.compare(inputPassword, savedPassword)
};

userSchema.methods.changedPasswordAfter = function (
  this: userDocs,
  JWTtimestamp: number
): boolean {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      (this.passwordChangedAt.getTime() / 1000).toString(),
      10
    );
    return JWTtimestamp < changedTimeStamp
  };

  return false
};

userSchema.methods.createPasswordResetToken = function (this: userDocs) {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

  return resetToken;
};

const User = mongoose.model<userDocs, userModel>('User', userSchema);

export { User }

