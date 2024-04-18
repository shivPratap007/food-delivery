import express from "express";
import { MONGO_DB_URL } from "./config";
import mongoose from "mongoose";
import { AdminRoute, VendorRoute } from "./routes";
import { DbConnect } from "./config/dbConnect";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admin", AdminRoute);
app.use("/vandor", VendorRoute);

app.listen(8000, async () => {
  console.log("App is running on port 8000");
  await DbConnect(MONGO_DB_URL);
});
