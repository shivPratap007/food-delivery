import express, {Request, Response, NextFunction} from "express";
import { CreateVendor, GetVandors, GetVandorsByID } from "../controllers";

const router=express.Router();

router.get('/',(req:Request,res:Response,next:NextFunction)=>{
    return res.json({
        message:"Hello from ADMIN"
    })
})

router.post('/vandor',CreateVendor)

router.get('/vandors', GetVandors)

router.get('/vandors/:id', GetVandorsByID)

export {router as AdminRoute};