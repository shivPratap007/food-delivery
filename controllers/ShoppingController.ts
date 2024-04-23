import express, { Response, NextFunction } from "express";
import { NewRequest } from "../config/RequestConfig";
import { vandor } from "../models";
import {
  ObjectIdSchema,
  PinCodeValidationSchema,
} from "../schema/ShoppingSchemas";
import { Food } from "../models/Foods";

export const GetFoodAvability = async (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const pincode = req.params.pincode;

    PinCodeValidationSchema.parse(pincode);

    const availableFoodAtPIN = await vandor

      .find({ serviceAvailable: true, pincode: pincode })

      .sort([["rating", "descending"]])

      .populate("foods");

    if (availableFoodAtPIN.length > 0) {
      return res.status(200).json(availableFoodAtPIN);
    }
    return res.status(400).json({ message: "No food available" });
  } catch (error: any) {
    console.log(error);

    return res.json({
      status: false,
      message: error.message,
    });
  }
};

export const GetTopRestuarants = async (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const pinCode = req.params.pincode;
    PinCodeValidationSchema.parse(pinCode);

    const topRestaurant = await vandor
      .find({ pincode: pinCode, serviceAvailable: true })
      .sort([["rating", "descending"]]);

    if (topRestaurant.length > 0) {
      return res.status(200).json({
        status: true,
        topRestaurant,
      });
    }
    return res.status(400).json({
      status: false,
      message: "No restaurant available",
    });
  } catch (error: any) {
    console.log(error);
    return res.json({
      status: false,
      message: error.message,
    });
  }
};

export const GetFoodsIn30Min = async (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const pinCode = req.params.pincode;
    PinCodeValidationSchema.parse(pinCode);

    // FIND THE RESTAURANTS BY THE GIVEN PINCODE
    const restaurantsFormPIN = await vandor.find({
      pincode: pinCode,
      serviceAvailable: true,
    });

    // GET THE ID OF ALL THE RESTAURANTS WHICH ARE MATCHING WITH THE GIVEN PIN CODE
    const vandorIds = restaurantsFormPIN.map((restaurant) => restaurant.id);

    if (vandorIds.length <= 0) {
      return res.status(400).json({
        status: false,
        message: "No restaurant available",
      });
    }

    // FROM ALL THE FOODS SEARCH ALL THE FOODS WHICH HAVE ID'S WE HAVE FOUND ABOVE
    const quickFood = await Food.aggregate([
      {
        $match: {
          // SELECTING FOOD WHOSE ID WE HAVE FOUND BY MATCHING THEM FROM THE VANDORID'S ARRAY
          vandorId: { $in: vandorIds },
          //   NOW SELECTING THE FOOD WHICH HAS PREPRATION TIME LESS THAN 40 MINUTES
          readyTime: { $lt: 40 },
        },
      },
    ]);

    if (quickFood.length <= 0) {
      return res.status(400).json({
        status: false,
        message: "No food available",
      });
    }

    return res.status(200).json({
      status: true,
      quickFood,
    });
  } catch (error: any) {
    console.log(error);
    return res.json({
      status: false,
      message: error.message,
    });
  }
};
export const SearchFoods = async (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const pinCode = req.params.pincode;
    PinCodeValidationSchema.parse(pinCode);

    const vandors = await vandor.find({
      pincode: pinCode,
      serviceAvailable: true,
    });

    if (vandors.length <= 0) {
      return res.status(400).json({
        status: false,
        message: "No food found",
      });
    }
    console.log(vandors);
    const vandorIDs = vandors.map((vandor) => vandor.id);
    console.log(vandorIDs);

    const foods = await Food.aggregate([
      {
        $match: {
          vandorId: { $in: vandorIDs },
        },
      },
    ]);
    if (foods.length <= 0) {
      return res.status(400).json({
        status: false,
        message: "No food found",
      });
    }

    return res.json(foods);
  } catch (error: any) {
    console.log(error);
    return res.json({
      status: false,
      message: error.message,
    });
  }
};
export const RestaurantsByID = async (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const vandorID = req.params.id;
    ObjectIdSchema.parse(vandorID);

    const vandorFromID = await vandor.findById(vandorID);

    if (!vandorFromID) {
      // If vendor is not found, return a 404 Not Found response
      return res.status(404).json({ message: "Vendor not found" });
    }
    return res.json(vandorFromID);
  } catch (error: any) {
    console.log(error);
    return res.json({
      status: false,
      message: error.message,
    });
  }
};
