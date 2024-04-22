import mongoose, { Document, Schema } from "mongoose";

interface FoodDoc extends Document {
  vandorId: string;
  name: string;
  description: string;
  category: string;
  foodType: string;
  readyTime: number;
  price: number;
  rating: number;
  images: [string];
}

const FoodSchema:Schema<FoodDoc>=new mongoose.Schema({
    vandorId:{type:String},
    name:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String},
    foodType:{type:String,required:true},
    readyTime:{type:Number},
    price:{type:Number,required:true},
    rating:{type:Number},
    images:{type:[String]}
},{
    toJSON:{
        transform(doc,ret){
            delete ret._v,
            delete ret.createdAt,
            delete ret.updatedAt
        }
    },
    timestamps:true
})

export const Food=mongoose.model<FoodDoc>("Food",FoodSchema);
