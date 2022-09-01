import { CategoryModel } from "./category-model";
import { Document, model, Schema } from "mongoose";

// 1. Model Interface describing the data in the model:
export interface IProductModel extends Document {
  // Don't specify _id here!
  name: string;
  price: number;
  stock: number;
  categoryId: Schema.Types.ObjectId; // Foreign Key
}

// 2. Model Schema describing validation, constraints and more:
const ProductSchema = new Schema<IProductModel>(
  {
    name: {
      type: String,
      required: [true, "Missing name"],
      minlength: [3, "Name too short"],
      maxlength: [100, "Name too long"],
      match: [/^[A-Z].+$/, "Name must start with a capital letter"],
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Missing price"],
      min: [0, "Price can't be negative"],
      max: [1000, "Price can't exceed 1000"],
    },
    stock: {
      type: Number,
      required: [true, "Missing stock"],
      min: [0, "Stock can't be negative"],
      max: [10000, "Stock can't exceed 10000"],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    versionKey: false, // Don't create __v field for versioning
    toJSON: { virtuals: true }, // When converting db to json - allow to bring virtual fields
    id: false, // Don't duplicate _id into id field
  }
);

// Virtual Fields:
ProductSchema.virtual("category", {
  ref: CategoryModel, // Which model are you describing?
  localField: "categoryId", // Which field in our model is it
  foreignField: "_id", // Which field in CategoryModel is it
  justOne: true, // category is a single object and not array
});

// 3. Model Class - this is the final model class:
export const ProductModel = model<IProductModel>(
  "ProductModel",
  ProductSchema,
  "products"
);
