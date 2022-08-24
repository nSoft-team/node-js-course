const mongoose = require("mongoose");

// Create Category Schema:
const CategorySchema = mongoose.Schema(
  {
    // Don't specify _id, or you'll need to supply it instead of MongoDB.
    name: String,
    description: String,
  },
  {
    versionKey: false, // Don't return field "__v" on each object.
    toJSON: { virtuals: true }, // Support virtual fields.
    id: false, // Don't duplicate "_id" into "id" when selecting objects (default behaviour of toJSON).
  }
);

// Create a virtual field for all products of that category (only if we do want to select categories with their products):
CategorySchema.virtual("products", {
  ref: "ProductModel",
  localField: "_id",
  foreignField: "categoryId",
});

// Create Category Model:
const CategoryModel = mongoose.model(
  "CategoryModel",
  CategorySchema,
  "categories"
); // Model, Schema, Collection

module.exports = CategoryModel;
