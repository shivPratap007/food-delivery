import { Request, Response, NextFunction } from "express";
import { NewRequest } from "../config/RequestConfig";
import { vandor } from "../models";
import { CreateVandorInput } from "../dto";

export const CreateVandor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    address,
    pincode,
    foodType,
    email,
    password,
    ownerName,
    phone,
  } = <CreateVandorInput>req.body;

  const existingVandor = await vandor.find({ email: email });
  if (existingVandor.length != 0) {
    return res.json({
      message: "This email is already registered with a vandor",
    });
  }

  const createVandor = await vandor.create({
    name,
    address,
    pincode,
    foodType,
    email,
    password,
    ownerName,
    phone,
    salt: "yo yo",
    rating: 0,
    serviceAvailable: false,
    coverImage: [],
    foods:[]
  });

  return res.json({
    createVandor,
  });
};
export const GetVandors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allVandors = await vandor.find({});
    if (allVandors.length == 0) {
      return res.json({ status: false, message: "Vandors data not found" });
    }
    return res.json(allVandors);
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: error,
    });
  }
};
export const GetVandorsByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vandorID = req.params.id;
    if (!vandorID) {
      return res.json({ status: false, message: "Please provide a correct vandor ID" });
    }
    const Vandor = await vandor.findById(vandorID);
    if (!Vandor) {
      return res.json({ status: false, message: "Vandors data not found" });
    }
    return res.json(Vandor);
  } catch (error:any) {
    console.log(error);
    return res.json({
      status: false,
      message: error.message,
    });
  }
};
