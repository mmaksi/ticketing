import express from 'express';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { ErrorNotFound } from './errors/not-found-error';

const app = express();
app.use(express.json());

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.all('*', () => {
  throw new ErrorNotFound();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Listening on port 3000!`);
});
