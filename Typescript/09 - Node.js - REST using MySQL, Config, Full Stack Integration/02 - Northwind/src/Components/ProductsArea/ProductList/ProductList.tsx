import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import notify from "../../../Services/NotifyService";
import productsService from "../../../Services/ProductsService";
import Loading from "../../SharedArea/Loading/Loading";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

function ProductList(): JSX.Element {
  // Create products state:
  const [products, setProducts] = useState<ProductModel[]>([]);

  // Do side-effect once:
  useEffect(() => {
    productsService
      .fetchProducts()
      .then((products) => setProducts(products))
      .catch((err) => notify.error(err));
  }, []);

  return (
    <div className="ProductList">
      {products.length === 0 && <Loading />}

      <NavLink to="/products/new">➕</NavLink>

      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default ProductList;
