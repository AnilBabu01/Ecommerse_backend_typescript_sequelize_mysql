import {Router} from 'express'
import {registerUser,loginUser }from '../controllers/authController'
export const router = Router();

router.post('/regster', registerUser);
router.post('/login', loginUser);