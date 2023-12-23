import express from 'express';
import { currentUser } from '../controllers/user.controller';
const router = express.Router();

router.get('/api/users/currentuser', currentUser);

export { router as currentUserRouter };
