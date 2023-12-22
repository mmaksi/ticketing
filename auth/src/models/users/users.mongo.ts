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

// Define middleware before creating the model
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.hash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

// Define static method before creating the model
userSchema.statics.build = (attributes: UserAttributes) => {
  console.log('build');
  return new User(attributes);
};

// Create and export the User model
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User, UserDoc };
