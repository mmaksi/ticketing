import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { createUser, findUser } from '../models/users/users.model';
import { Request, Response } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';
import { Password } from '../utils/bcrypt';
import { UserDoc } from '../models/users/users.mongo';

interface RequestBody {
  email: string;
  password: string;
}

const generateJwtToken = (req: Request, user: UserDoc) => {
  // Generate JWT
  const userJwt = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_KEY!,
  );
  // Store it in session object
  req.session = { jwt: userJwt };
};

const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body as RequestBody;

  const existingUser = await findUser(email);
  if (existingUser) throw new BadRequestError('Email already in use');
  const user = await createUser(email, password);

  generateJwtToken(req, user);

  return res.status(201).json(user);
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await findUser(email);
  if (!existingUser) throw new BadRequestError('Invalid credentials');

  const passwordMatch = await Password.compare(existingUser.password, password);
  if (!passwordMatch) throw new BadRequestError('Invalid credentials');

  generateJwtToken(req, existingUser);

  return res.status(200).json(existingUser);
};

const currentUser = async (req: Request, res: Response) => {
  if (req.session?.jwt) {
    return res.json({ currentUser: null });
  }

  try {
    const payload = jwt.verify(req.session?.jwt, process.env.JWT_KEY!);
    return res.json({ currentUser: payload });
  } catch (error) {
    return res.json({ currentUser: null });
  }
};

export { signUp, signIn, currentUser };
