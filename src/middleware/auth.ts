import { RequestHandler} from 'express';
import {User} from '../models/user'
import jwt from 'jsonwebtoken'
const JWT_SECRET = 'anilbabu$oy';


export const isAuthenticatedUser: RequestHandler = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const key = process.env.KEY;
    
        if (!token || !key)
          return res.status(401).json({ success: false, msg: 'Not Authorized' });
    
        let validate: any = null;
        try {
          validate = jwt.verify(token, JWT_SECRET);
        } catch (error) {
           res.status(401).json({ success: false, msg: 'Not Authorized' });
        }
    
        if (!validate)
          res.status(401).json({ success: false, msg: 'Not Authorized' });
      
        const user = await User.findOne({ where: { email: validate.userid} });
    
        if (!user)
          return res.status(401).json({ success: false, msg: 'Not Authorized' });
    
      

        
        next();
      } catch (error) {
        next(error);
      }
  };


  