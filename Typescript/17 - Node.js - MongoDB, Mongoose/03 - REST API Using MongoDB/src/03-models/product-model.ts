import { Document, model, Schema } from "mongoose";

// 1. Model Interface describing the data in the model:
export interface IProductModel extends Document {
  // Don't specify _id here!
  name: string;
  price: number;
  stock: number;
}

// 2. Model Schema describing validation, constraints and more:
const ProductSchema = new Schema<IProductModel>({
  name: {
    type: String,
    required: [true, "Missing name"],
    // more validation...
    trim: true,
    unique: true,
  },
  price: {
    type: Number,
    required: [true, "Missing price"],
    // more validation...
  },
  stock: {
    type: Number,
    required: [true, "Missing stock"],
    // more validation...
  },
});

// 3. Model Class - this is the final model class:
export const ProductModel = model<IProductModel>(
  "ProductModel",
  ProductSchema,
  "products"
);
