import express from 'express';
const router = express.Router();

router.post('/api/users/signin', (req, res) => {
  return res.send('signin');
});

export { router as signinRouter };