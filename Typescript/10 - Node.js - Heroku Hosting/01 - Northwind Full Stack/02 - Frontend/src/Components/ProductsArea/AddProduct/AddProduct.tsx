import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import notify from "../../../Services/NotifyService";
import productsService from "../../../Services/ProductsService";
import config from "../../../Utils/Config";
import "./AddProduct.css";

function AddProduct(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<ProductModel>();

  const navigate = useNavigate();

  async function submit(product: ProductModel) {
    try {
      await productsService.addNewProduct(product);

      notify.success("Product has been added!");

      // Navigate back to all products:
      navigate("/products");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <div className="AddProduct Box">
      <form onSubmit={handleSubmit(submit)}>
        <h2>Add Product</h2>

        <label>Name: </label>
        <input
          type="text"
          {...register("name", {
            required: { value: true, message: "Missing product name" },
          })}
        />
        <span>{formState.errors.name?.message}</span>

        <label>Price: </label>
        <input
          type="number"
          step="0.01"
          {...register("price", {
            required: { value: true, message: "Missing price" },
            min: { value: 0, message: "Price can't be negative" },
            max: { value: 1000, message: "Price can't exceed 1000" },
          })}
        />
        <span>{formState.errors.price?.message}</span>

        <label>Stock: </label>
        <input
          type="number"
          {...register("stock", {
            required: { value: true, message: "Missing stock" },
            min: { value: 0, message: "Stock can't be negative" },
            max: { value: 1000, message: "Stock can't exceed 1000" },
          })}
        />
        <span>{formState.errors.stock?.message}</span>

        <label>Image: </label>
        <input type="file" accept="image/*" {...register("image")} />

        <button>Add</button>
      </form>
    </div>
  );
}

export default AddProduct;
