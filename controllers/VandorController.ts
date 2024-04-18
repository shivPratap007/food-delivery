import { Request, Response, NextFunction } from "express";
import { vandor as vandorModel } from "../models";
import { VandorLoginInputs } from "../dto";
import { ValidatePassword } from "../utility/PasswordUtility";

export const VandorLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = <VandorLoginInputs>req.body;
    const existingVandor = await vandorModel.findOne({ email: email });
    if (existingVandor == null) {
      return res.json({
        status: false,
        message: "Please provide correct credentials",
      });
    }
    const validatePassword = await ValidatePassword(
      password,
      existingVandor.password,
      existingVandor.salt
    );
    if (!validatePassword) {
      return res.json({
        status: false,
        message: "Please provide correct credentials",
      });
    }
    return res.json({
      status: true,
      data: existingVandor,
    });
  } catch (error: any) {
    return res.json({
      status: false,
      message: error.message,
    });
  }
};



export const GetVandorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error: any) {
    return res.json({
      status: false,
      message: error.message,
    });
  }
};



export const UpdateVandorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error: any) {
    return res.json({
      status: false,
      message: error.message,
    });
  }
};



export const UpdateVandorService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error: any) {
    return res.json({
      status: false,
      message: error.message,
    });
  }
};
