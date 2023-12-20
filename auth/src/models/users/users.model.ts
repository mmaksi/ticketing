import { User } from './users.mongo';

function findUser(email: string) {
  User.findOne({ email });
}

export { findUser };
