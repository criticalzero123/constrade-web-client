import React from "react";
import { Outlet } from "react-router";

const ProductMessagesList = () => {
  return (
    <div>
      <p>list of product message</p>
      <Outlet />
    </div>
  );
};

export default ProductMessagesList;
