import mongoose, { Document, Model, Schema } from 'mongoose';

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

// statics
userSchema.statics.build = (attributes: UserAttributes) => {
  return new User(attributes);
};

export { User };
