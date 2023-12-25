import express from 'express';
import 'express-async-errors';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { ErrorNotFound } from './errors/not-found-error';
import cookieSession from 'cookie-session';

const app = express();
// trust traffic coming from the proxy
app.set('trust proxy', true); // bcz we have ingres-nginx as a reverse proxy
app.use(express.json());
app.use(
  cookieSession({
    signed: false, // don't encrypt the cookie
    secure: true,
  }),
);

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.all('*', async () => {
  throw new ErrorNotFound();
});

app.use(errorHandler);

export { app };
