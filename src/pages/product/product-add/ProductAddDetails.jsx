import React from "react";
import { useLocation } from "react-router";

const ProductAddDetails = () => {
  const { state } = useLocation();

  console.log(state.info);

  return (
    <div className="grid grid-cols-2 p-4">
      <div>item details</div>
      <div>shipping </div>
    </div>
  );
};

export default ProductAddDetails;
