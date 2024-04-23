import jwt from "jsonwebtoken";
import { Request } from "express";
import { VandorPayload } from "../dto";
import { JWT_SECRET } from "../config";
import { AuthPayload } from "../dto/Auth.dto";
import { NewRequest } from "../config/RequestConfig";


export const GenerateSignature = (payload: VandorPayload) => {
  const signature = jwt.sign(payload, JWT_SECRET);

  return signature;
};

export const ValidateSignature=async(req:NewRequest)=>{

    const signature=req.headers.authorization;

    if(signature){
        const payload=jwt.verify(signature.split(' ')[1],JWT_SECRET) as AuthPayload;
        // ERROR JUGAAD TO ADD USER IN REQ BU MAKING REQUEST AS NEWREQUEST
        req.user=payload
        
        return true;
    }
    return false;
}
