import express from 'express';
import 'express-async-errors';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { ErrorNotFound } from './errors/not-found-error';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

const app = express();
// trust traffic coming from the proxy
app.set('trust proxy', true); // bcz we have ingres-nginx as a reverse proxy
app.use(express.json());

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);
app.use(
  cookieSession({
    signed: false, // don't encrypt the cookie
    secure: true,
  }),
);

app.all('*', async () => {
  throw new ErrorNotFound();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
};

start();

app.listen(3000, () => {
  console.log(`Listening on port 3000!`);
});
