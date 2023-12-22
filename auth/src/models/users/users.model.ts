import { User, UserDoc } from './users.mongo';

async function findUser(email: string) {
  return await User.findOne({ email });
}

async function createUser(email: string, password: string) {
  const user = User.build({ email, password });
  await user.save();
  console.log({ user });
  return user;
}

export { findUser, createUser };
