const mongoose = require("mongoose");

// Create Product Schema:
const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Missing name."],
      minlength: [2, "Name must be minimum 2 chars."],
      maxlength: [100, "Name can't exceed 100 chars."],
      match: [/^[A-Z].*$/, "Name must start with a capital letter."],
      validate: {
        validator: (value) => value.indexOf("  ") === -1, // Return true means no error.
        message: "Name can't contain multiple spaces.",
      },
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Missing price."],
      min: [0, "Price can't be negative."],
      max: [10000, "Price can't exceed 10,000."],
    },
    stock: {
      type: Number,
      required: [true, "Missing stock."],
      min: [0, "Stock can't be negative."],
      max: [10000, "Stock can't exceed 10,000."],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryModel",
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
  }
);

// Create a virtual field for the category (only if we do want to get a category with any product):
ProductSchema.virtual("category", {
  ref: "CategoryModel",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true, // Create the category as a single object rather than an array.
});

ProductSchema.pre("validate", function (next) {
  if (this.price === 0 && this.stock === 0) {
    this.invalidate("price and stock", "Both price and stock can't be zero.");
  }
  next();
});

// Create Product Model:
const ProductModel = mongoose.model("ProductModel", ProductSchema, "products");

module.exports = ProductModel;

// Joi validation advantages:
// We can easily perform separate validations according request method (POST/PUT/PATCH).

// Mongoose validation advantages:
// We don't need external library for validation.
// Easier to send back custom error messages.
// The validation is done also in the database level, but in that case there will be an exception.
