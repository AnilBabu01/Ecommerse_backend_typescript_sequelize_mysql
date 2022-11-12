import { RequestHandler} from 'express';
import {User} from '../models/user'
import jwt from 'jsonwebtoken'
import {hash,genSalt,compare} from 'bcryptjs'
const JWT_SECRET = 'anilbabu$oy';

export const registerUser: RequestHandler = async (req, res, next) => {
    try {
       const { email,name,password } = req.body;
       if(!name)
       {

       }
       let user = await User.findOne({ where: {email: email } });

        if(user){
            res
            .status(401)
            .json({ status: false, msg: "User Allready exist with email"});
   
        }
        else{
            const salt = await genSalt(10);
            const secPass = await hash(password, salt);
            user = await User.create({
                name:name,
                email:email,
                password:secPass
             });
             const data = {
                user: {
                    userid: user.userid
                }
              }
              const token = jwt.sign(data, JWT_SECRET);


             res
               .status(200)
               .json({ status: true,token :token , msg: "Register  Successfully", user: user });
        }

   } catch (error) {
      next(error);
    }
  };


  
export const loginUser: RequestHandler = async (req, res, next) => {
    try {
     const {
      email,
      password,
    }: { username: string; email: string; password: string } = req.body;
    
    if (!email)
    {
         res.status(401).json({ msg: 'Useremail required', success: false });
    }
    if (!password)
    {
         res.status(401).json({ msg: 'password required', success: false });
    }
    let user = await User.findOne({ where: { email:email } });
    if(!user){
        res
        .status(401)
        .json({ status: false, msg: "User name not exists"});

    }
    else
    {
        const data = {
            user: {
              id: user.id
            }
          }
          const token = jwt.sign(data, JWT_SECRET);

          res
    .status(200)
    .json({ status: true,token:token, msg: "Login  Successfully", user: user });
    }

    } catch (error) {
      next(error);
    }
  };



  