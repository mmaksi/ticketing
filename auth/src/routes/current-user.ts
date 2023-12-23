import express from 'express';
import { httpCurrentUser } from '../controllers/user.controller';
import { currentUser } from '../middlewares/currentUser';
import { requireAuthentication } from '../middlewares/require-auth.middleware';
const router = express.Router();

router.get(
  '/api/users/currentuser',
  currentUser,
  requireAuthentication,
  httpCurrentUser,
);

export { router as currentUserRouter };
