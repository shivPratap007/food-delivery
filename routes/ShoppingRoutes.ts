import express from "express";
import { GetFoodAvability, GetFoodsIn30Min, GetTopRestuarants, RestaurantsByID, SearchFoods } from "../controllers";

const router=express.Router()

// FOOD AVABILITY
router.get('/:pincode',GetFoodAvability)

// TOP RESTAURANTS
router.get('/top-restaurant/:pincode',GetTopRestuarants)

// FOOD AVABILITY IN 30 MINITUES
router.get('/food-in-30-min/:pincode',GetFoodsIn30Min)

// SEARCH FOOD
router.get('/search/:pincode',SearchFoods)

// FIND RESTAURANT BY ID
router.get('/restaurant/:id',RestaurantsByID)

export {router as ShoppingRoute}