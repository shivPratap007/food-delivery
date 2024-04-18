import express, {Request, Response, NextFunction} from "express";
import { CreateVandor, GetVandors, GetVandorsByID } from "../controllers";
import { NewRequest } from "../config/RequestConfig";


const router=express.Router();

router.get('/',(req:NewRequest,res:Response,next:NextFunction)=>{
    return res.json({
        message:"Hello from ADMIN"
    })
})

router.post('/vandor',CreateVandor)

router.get('/vandors', GetVandors)

router.get('/vandors/:id', GetVandorsByID)

export {router as AdminRoute};