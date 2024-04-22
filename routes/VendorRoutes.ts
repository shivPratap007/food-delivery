import express, { Request, Response, NextFunction } from "express";
import {
  AddFood,
  GetFoods,
  GetVandorProfile,
  UpdateVandorProfile,
  UpdateVandorService,
  VandorLogin,
} from "../controllers";
import { NewRequest } from "../config/RequestConfig";
import { Authenticate } from "../middlewares/CommonAuth";
import multer from "multer";

const router = express.Router();

const imageStore = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    const currentDate = new Date().toISOString().slice(0, 10); 
    cb(null, currentDate + "_" + file.originalname);
  },
});

const images = multer({ storage: imageStore }).array("images", 10);

router.get("/", (req: NewRequest, res: Response, next: NextFunction) => {
  return res.json({
    message: "Hello from VENDOR",
  });
});

router.get("/login", VandorLogin);

router.get("/profile", Authenticate, GetVandorProfile);

router.patch("/profile", Authenticate, UpdateVandorProfile);

router.patch("/service", Authenticate, UpdateVandorService);

router.post("/food", Authenticate, images, AddFood);

router.get("/foods", Authenticate, GetFoods);

export { router as VandorRoute };
