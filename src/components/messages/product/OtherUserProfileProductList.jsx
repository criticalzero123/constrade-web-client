import React from "react";
import { useProductByUser } from "../../../hooks/product/useProductByUser";
const OtherUserProfileProductList = ({ id }) => {
  const [products] = useProductByUser(id);

  if (products === undefined) return <p>Loading...</p>;

  if (products.length === 0)
    return (
      <div>
        <p>No item he got</p>
      </div>
    );

  return (
    <div>
      <p>Hellowie</p>
    </div>
  );
};

export default OtherUserProfileProductList;
