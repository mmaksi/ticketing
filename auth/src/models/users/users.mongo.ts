import mongoose, { Document, Model, Schema } from 'mongoose';
import { Password } from '../../utils/bcrypt';

interface UserAttributes {
  password: string;
  email: string;
}

interface UserModel extends Model<UserDoc> {
  build(attributes: UserAttributes): UserDoc;
}

interface UserDoc extends Document {
  password: string;
  email: string;
}

const userSchema = new Schema<UserDoc, UserModel>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// User model to access User collection in mongo
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// middlewares
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.hash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

// statics
userSchema.statics.build = (attributes: UserAttributes) => {
  return new User(attributes);
};

export { User, UserDoc };
