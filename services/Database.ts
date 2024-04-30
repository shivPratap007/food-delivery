import mongoose from "mongoose";
export async function DbConnect(MONGO_DB_URL: string) {
  try {
    mongoose.connection.on("connected", () => console.log("connected"));
    mongoose.connection.on("disconnected", (err) => console.log("disconnected",err));

    await mongoose.connect(MONGO_DB_URL);
    console.log("Db connected successfully");
  } catch (error) {
    console.log(error);
  }
}
