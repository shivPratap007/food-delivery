import mongoose from "mongoose";
export async function DbConnect(MONGO_DB_URL:string){
    try {
        await mongoose.connect(MONGO_DB_URL);
        console.log("Db connected successfully");
      } catch (error) {
        console.log(error);
      }
}