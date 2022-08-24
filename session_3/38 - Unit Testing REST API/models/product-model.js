const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Missing name."],
      minlength: [2, "Name must be minimum 2 chars."],
      maxlength: [100, "Name can't exceed 100 chars."],
      match: [/^[A-Z].*$/, "Name must start with a capital letter."],
      validate: {
        validator: (value) => value.indexOf("  ") === -1,
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

ProductSchema.virtual("category", {
  ref: "CategoryModel",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});

ProductSchema.pre("validate", function (next) {
  if (this.price === 0 && this.stock === 0) {
    this.invalidate("price and stock", "Both price and stock can't be zero.");
  }
  next();
});

const ProductModel = mongoose.model("ProductModel", ProductSchema, "products");

module.exports = ProductModel;
