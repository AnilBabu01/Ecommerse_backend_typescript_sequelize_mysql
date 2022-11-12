import {Router} from 'express'
import {registerUser,loginUser,getallusers }from '../controllers/authController'
import {isAuthenticatedUser} from '../middleware/auth'
export const router = Router();

router.post('/regster', registerUser);
router.post('/login', loginUser);
router.get('/getAlluers',isAuthenticatedUser,getallusers)