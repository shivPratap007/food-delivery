import express, {Request, Response, NextFunction} from "express";
import { GetVandorProfile, UpdateVandorProfile, UpdateVandorService, VandorLogin } from "../controllers";
import { NewRequest } from "../config/RequestConfig";
import { Authenticate } from "../middlewares/CommonAuth";


const router=express.Router();

router.get('/',(req:NewRequest,res:Response,next:NextFunction)=>{
    return res.json({
        message:"Hello from VENDOR"
    })
})

router.get('/login',VandorLogin);

router.get('/profile' ,Authenticate,GetVandorProfile)

router.patch('/profile',Authenticate,UpdateVandorProfile)

router.patch('/service',Authenticate,UpdateVandorService)

export {router as VandorRoute};