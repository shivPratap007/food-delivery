import { Request, Response, NextFunction } from "express";
import { NewRequest } from "../config/RequestConfig";
import { vandor as vandorModel } from "../models";
import { EditVandorInput, VandorLoginInputs } from "../dto";
import { ValidatePassword } from "../utility/PasswordUtility";
import { GenerateSignature } from "../utility/JwtUtility";

export const VandorLogin = async (
  req: NewRequest,
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
    // GENERATE JWT SIGNATURE
    const signature = GenerateSignature(existingVandor.id);
    return res.json({
      status: true,
      data: existingVandor,
      signature,
    });
  } catch (error: any) {
    return res.json({
      status: false,
      message: error.message,
    });
  }
};

export const GetVandorProfile = async (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (user) {
      const existingUser = await vandorModel.findById(user);
      return res.json({ status: true, existingUser });
    } else {
      return res.json({
        status: true,
        message: "Vandor information not found",
      });
    }
  } catch (error: any) {
    return res.json({
      status: false,
      message: error.message,
    });
  }
};

export const UpdateVandorProfile = async (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { foodType, name, address, phone } = <EditVandorInput>req.body;
    const user = req.user;
    if (user) {
      const existingUser = await vandorModel.findById(user);
      if (existingUser !== null) {
        existingUser.name = name;
        existingUser.address = address;
        existingUser.phone = phone;
        existingUser.foodType = foodType;
        const updatedUser = await existingUser.save();
        return res.json({
          status: true,
          updatedUser,
        });
      }
      return res.json({ status: true, existingUser });
    } else {
      return res.json({
        status: true,
        message: "Vandor information not found",
      });
    }
  } catch (error: any) {
    return res.json({
      status: false,
      message: error.message,
    });
  }
};

export const UpdateVandorService = async (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (user) {
      const existingUser = await vandorModel.findById(user);
      if (existingUser !== null) {
        // Toggle the serviceAvailable property
        existingUser.serviceAvailable = String(!existingUser.serviceAvailable)
        console.log(typeof !existingUser.serviceAvailable)

        // Save the changes
        const updatedUser = await existingUser.save();
        return res.json({
          status: true,
          updatedUser,
        });
      }
      return res.json({ status: true, existingUser });
    } else {
      return res.json({
        status: true,
        message: "Vandor information not found",
      });
    }
  } catch (error: any) {
    return res.json({
      status: false,
      message: error.message,
    });
  }
};
