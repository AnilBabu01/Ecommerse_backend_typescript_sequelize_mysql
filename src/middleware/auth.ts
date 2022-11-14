import { Handler } from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
const JWT_SECRET = "anilbabu$oy";

export const isAuthenticatedUser: Handler = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (token) {
      token = token.split(" ")[1];
      console.log(token);
      let validate: any = null;
      try {
        validate = jwt.verify(token, JWT_SECRET);
        if (!validate)
          res.status(401).json({ success: false, msg: "Not b  Authorized" });
        if (validate) {
          const user = await User.findOne({
            where: { userid: validate.user.userid },
          });

          if (!user)
            res.status(401).json({ success: false, msg: "Not  cAuthorized" });
          return;

          req.user = (user as any)._doc;
        }
      } catch (error) {
        res.status(401).json({ success: false, msg: "Not a Authorized" });
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};
