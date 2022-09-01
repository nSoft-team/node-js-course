import { IProductModel, ProductModel } from "../03-models/product-model";
import ErrorModel from "../03-models/error-model";

async function getAllProducts(): Promise<IProductModel[]> {
  return ProductModel.find().exec(); // (SELECT * FROM Products)
}

async function getOneProduct(_id: string): Promise<IProductModel> {
  const product = await ProductModel.findById(_id).exec();
  if (!product) throw new ErrorModel(404, `_id ${_id} not found`);
  return product;
}

export default {
  getAllProducts,
  getOneProduct,
};
