import { Request, Response, NextFunction, RequestHandler } from "express";
import { User } from "../models/user";
import { verify } from "jsonwebtoken";

const JWT_SECRET = "anilbabu$oy";

export const fetch_user: RequestHandler = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ success: false, msg: "Not Authorized" });
    }

    let validate: any;
    try {
      validate = verify(token.split(" ")[1], JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ success: false, msg: "Not Authorized" });
    }

    if (!validate.user) {
      return res.status(401).json({ success: false, msg: "Not Authorized" });
    }

    const user = await User.findOne({
      where: { userid: validate.user.userid },
    });

    if (!user) {
      return res.status(401).json({ success: false, msg: "Not Authorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const authorizeRoles = (...roles: String[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      console.log(req.user.role);
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          Success: false,
          msg: `Role (${req.user.role}) is not allowed to acccess this resource`,
        });
      }
    }

    next();
  };
};
