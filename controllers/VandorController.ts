import { Request, Response, NextFunction } from "express";
import { NewRequest } from "../config/RequestConfig";
import { vandor as vandorModel } from "../models";
import { EditVandorInput, VandorLoginInputs } from "../dto";
import { ValidatePassword } from "../utility/PasswordUtility";
import { GenerateSignature } from "../utility/JwtUtility";
import { CreateFoodInputs } from "../dto/Foods.dto";
import { Food } from "../models/Foods";

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
        existingUser.serviceAvailable = Boolean(!existingUser.serviceAvailable);
        console.log(typeof !existingUser.serviceAvailable);

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

export const AddFood = async (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    const { name, description, category, foodType, readyTime, price } = <
      CreateFoodInputs
    >req.body;
    const vandor = await vandorModel.findById(user);
    if (vandor != null) {
      const files=req.files as [Express.Multer.File];
      const images=files.map((file:Express.Multer.File)=> file.filename)
      const createdFood = await Food.create({
        vandorId: vandor._id,
        name: name,
        description: description,
        category: category,
        foodType: foodType,
        images: images,
        readyTime: readyTime,
        price: price,
        rating: 0,
      });
      vandor.foods.push(createdFood);
      const result = await vandor.save();
      return res.json(result);
    }
  } catch (error: any) {
    console.log(error);
    return res.json({
      status: false,
      error: error.message,
    });
  }
};

export const GetFoods = async (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const loggedInUserId=req.user;
    const allFoodsOfLoginUser=await Food.find({vandorId:loggedInUserId});
    if(!allFoodsOfLoginUser){
      return res.json({
        status:false,
        message:"No food is available under this vendor",
      })
    }
    return res.json({
      allFoodsOfLoginUser,
    })
  } catch (error: any) {
    console.log(error);
    return res.json({
      status: false,
      error: error.message,
    });
  }
};
