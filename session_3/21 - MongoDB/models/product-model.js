const Joi = require("joi");
const BaseModel = require("./base-model");

class ProductModel extends BaseModel {
  constructor(product) {
    super(product._id);
    this.name = product.name;
    this.price = product.price;
    this.stock = product.stock;
    this.categoryId = product.categoryId;
  }

  static #postValidationSchema = Joi.object({
    _id: Joi.forbidden(),
    name: Joi.string()
      .required()
      .min(2)
      .max(100)
      .regex(/^[A-Z].*$/)
      .custom(BaseModel.multipleSpacesValidation),
    price: Joi.number().required().min(0).max(10000),
    stock: Joi.number().required().integer().min(0).max(10000),
    categoryId: Joi.string()
      .required()
      .regex(/^[0-9a-f]{24}$/),
  }).error(BaseModel.customErrors);

  static #putValidationSchema = Joi.object({
    _id: Joi.string().required().hex().length(24),
    name: Joi.string()
      .required()
      .min(2)
      .max(100)
      .regex(/^[A-Z].*$/)
      .custom(BaseModel.multipleSpacesValidation),
    price: Joi.number().required().min(0).max(10000),
    stock: Joi.number().required().integer().min(0).max(10000),
    categoryId: Joi.string()
      .required()
      .regex(/^[0-9a-f]{24}$/),
  }).error(BaseModel.customErrors);

  static #patchValidationSchema = Joi.object({
    _id: Joi.string().required().hex().length(24),
    name: Joi.string()
      .optional()
      .min(2)
      .max(100)
      .regex(/^[A-Z].*$/)
      .custom(BaseModel.multipleSpacesValidation),
    price: Joi.number().optional().min(0).max(10000),
    stock: Joi.number().optional().integer().min(0).max(10000),
    categoryId: Joi.string()
      .optional()
      .regex(/^[0-9a-f]{24}$/),
  }).error(BaseModel.customErrors);

  validatePost() {
    const result = ProductModel.#postValidationSchema.validate(this, {
      abortEarly: false,
    });
    return result.error?.details.map((err) => err.message);
  }

  validatePut() {
    const result = ProductModel.#putValidationSchema.validate(this, {
      abortEarly: false,
    });
    return result.error?.details.map((err) => err.message);
  }

  validatePatch() {
    const result = ProductModel.#patchValidationSchema.validate(this, {
      abortEarly: false,
    });
    return result.error?.details.map((err) => err.message);
  }
}

module.exports = ProductModel;
