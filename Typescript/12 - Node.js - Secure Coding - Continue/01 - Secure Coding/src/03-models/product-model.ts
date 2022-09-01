import Joi from "joi";

class ProductModel {
  public id: number;
  public name: string;
  public price: number;
  public stock: number;
  public imageName: string;

  public constructor(product: ProductModel) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.stock = product.stock;
  }

  private static postSchema = Joi.object({
    id: Joi.forbidden(),
    name: Joi.string().required().min(2).max(100),
    price: Joi.number().required().min(0).max(1000),
    stock: Joi.number().required().integer().min(0).max(10000),
    imageName: Joi.string().optional(),
  });

  private static putSchema = Joi.object({
    id: Joi.number().required().integer().min(1),
    name: Joi.string().required().min(2).max(100),
    price: Joi.number().required().min(0).max(1000),
    stock: Joi.number().required().integer().min(0).max(10000),
    imageName: Joi.string().optional(),
  });

  private static patchSchema = Joi.object({
    id: Joi.number().required().integer().min(1),
    name: Joi.string().optional().min(2).max(100),
    price: Joi.number().optional().min(0).max(1000),
    stock: Joi.number().optional().integer().min(0).max(10000),
    imageName: Joi.string().optional(),
  });

  public validatePost(): string {
    const result = ProductModel.postSchema.validate(this);
    return result.error?.message;
  }

  public validatePut(): string {
    const result = ProductModel.putSchema.validate(this);
    return result.error?.message;
  }

  public validatePatch(): string {
    const result = ProductModel.patchSchema.validate(this);
    return result.error?.message;
  }
}

export default ProductModel;
