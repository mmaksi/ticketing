import express from 'express';
import { httpSignout } from '../controllers/user.controller';
const router = express.Router();

router.post('/api/users/signout', httpSignout);

export { router as signoutRouter };
