import mongoose, { Schema, Document, Model, Mongoose } from "mongoose";
import { PasswordUtility } from "../utility/PasswordUtility";

interface VandorDoc extends Document {
  name: string;
  ownerName: string;
  foodType: [string];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  salt: string;
  serviceAvailable: string;
  coverImage: [string];
  rating: number;
  //   foods: any;
}

const VandorSchema = new Schema(
  {
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    foodType: { type: [String] },
    pincode: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    serviceAvailable: { type: Boolean, required: true },
    coverImage: { type: [String] },
    rating: { type: Number },
    //   foods: { type: mongoose.SchemaTypes.ObjectId, ref: "food" },
  },
  { timestamps: true,toJSON:{transform(doc,ret){
    delete ret.password;
    delete ret.salt;
    delete ret.__v;
    delete ret.createAt;
    delete ret.updatedAt;
  }} }
);

VandorSchema.pre("save", async function (next) {
    // If password is not modified, move to the next middleware
    if (!this.isModified("password")) {
      return next();
    }
    await PasswordUtility(this, next);
  });

const vandor = mongoose.model<VandorDoc>("vandor", VandorSchema);

export { vandor };
