import React from "react";
import { useProductByUser } from "../../../hooks/product/useProductByUser";
import { useUserInfo } from "../../../hooks/useUserInfo";
import ProductCard from "../../../components/product-card/ProductCard";
const MyProductList = () => {
  const { user } = useUserInfo();
  const [products, deleteProduct] = useProductByUser(user.userId);

  if (products === undefined) return <p>Loading...</p>;

  if (products.length === 0)
    return (
      <div>
        <p>No item you got</p>
      </div>
    );

  return (
    <div className="container px-4">
      <div className="grid grid-cols-3">
        {products.map((product, index) => (
          <ProductCard
            product={product}
            key={index}
            isOwner={true}
            deleteProduct={deleteProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default MyProductList;
