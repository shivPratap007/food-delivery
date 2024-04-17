import express, {Request, Response, NextFunction} from "express";
import { CreateVendor, GetVandors, GetVandorsByID } from "../controllers";

const router=express.Router();

router.get('/',(req:Request,res:Response,next:NextFunction)=>{
    return res.json({
        message:"Hello from ADMIN"
    })
})

router.post('/vendor',CreateVendor)

router.get('/vendors', GetVandors)

router.get('/vendors/:id', GetVandorsByID)

export {router as AdminRoute};