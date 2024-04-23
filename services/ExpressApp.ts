import express, { Application } from "express";
import { AdminRoute, VandorRoute } from "../routes";
import path from "path";
import { ShoppingRoute } from "../routes";

export default async function MainApp(app: Application) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/images", express.static(path.join(__dirname, "images")));

  app.use("/admin", AdminRoute);
  app.use("/vandor", VandorRoute);
  app.use('/shopping',ShoppingRoute);
  return app;
}


