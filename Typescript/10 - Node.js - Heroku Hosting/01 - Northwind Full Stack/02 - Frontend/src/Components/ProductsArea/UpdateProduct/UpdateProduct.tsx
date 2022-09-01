import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import notify from "../../../Services/NotifyService";
import productsService from "../../../Services/ProductsService";
import "./UpdateProduct.css";

function UpdateProduct(): JSX.Element {
  const params = useParams();
  const id = +params.id;

  const navigate = useNavigate();

  const { register, handleSubmit, formState, setValue } =
    useForm<ProductModel>();

  useEffect(() => {
    productsService
      .getOneProduct(id)
      .then((product) => {
        setValue("name", product.name);
        setValue("price", product.price);
        setValue("stock", product.stock);
      })
      .catch((err) => notify.error(err));
  }, []);

  async function submit(product: ProductModel) {
    try {
      product.id = id;
      await productsService.updateProduct(product);

      notify.success("Product updated.");

      // Navigate back to all products:
      navigate("/products");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <div className="UpdateProduct Box">
      <form onSubmit={handleSubmit(submit)}>
        <h2>Edit Product</h2>

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

        <button>Update</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
