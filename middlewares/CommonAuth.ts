import { Request, NextFunction,Response } from "express";
import { NewRequest } from "../config/RequestConfig";

import { AuthPayload } from "../dto/Auth.dto";
import { ValidateSignature } from "../utility/JwtUtility";



export const Authenticate = async (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const validate = await ValidateSignature(req);
    if (validate) {
      next();
    } else {
      return res.json({ status: false, message: "user not validated" });
    }
  } catch (error) {
    // Handle errors from ValidateSignature
    console.error("Error during authentication:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};
