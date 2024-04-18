import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function GenerateHassedPassword(password:string,salt:string){
  return await bcrypt.hash(password,salt);
}

export async function PasswordUtility(instance: any, next: any) {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    instance.salt = salt;
    // Hash the password with the salt
    const hashedPassword = await GenerateHassedPassword(instance.password, salt);
    // Replace plain password with hashed password
    instance.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
}

export async function ValidatePassword(givenPassword:string, savedPassword:string, salt:string){
  return await GenerateHassedPassword(givenPassword,salt)===savedPassword;
}


