import express from "express";

const router=express.Router();

// CREATE COSTUMER
router.post('/signup')

// LOGIN
router.post('/login');
// ------------------------------------------NEEDS AUTHENTICATION---------------------------------------
// VERIFY COSTUMER ACCOUNT
router.patch('/verify');

// REQUESTING OTP
router.get('/otp');

// PROFILE
router.get('/profile');

router.patch('/profile');

//CART
// ORDER
// PAYMENT 
export {router as CostumerRouter}