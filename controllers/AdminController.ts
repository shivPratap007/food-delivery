import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { vandor } from "../models";

export const CreateVendor = async (
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
  } = <CreateVendorInput>req.body;

  const existingVendor=await vandor.find({email:email});
  console.log(existingVendor);
  if(existingVendor.length!=0){
    return res.json({
        message:"This email is already registered with a vendor",
    })
  }

  const createVandor=await vandor.create({
    name,
    address,
    pincode,
    foodType,
    email,
    password,
    ownerName,
    phone,
    salt:"yo yo",
    rating:0,
    serviceAvailable:false,
    coverImage:[],
  })

  return res.json({
    createVandor
  });
};
export const GetVandors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const GetVandorsByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
