import { Request } from "express";
import { AuthPayload } from "../dto/Auth.dto";

export interface NewRequest extends Request{
    user?:AuthPayload
}