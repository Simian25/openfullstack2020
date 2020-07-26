import expess from 'express';
const router = expess.Router();
router.get('/', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
  });

  export default router