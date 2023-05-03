import React from "react";
import { Link } from "react-router-dom";

const ProductCardDisplay = ({ product }) => {
  return (
    <div className="rounded-lg border bg-gray-200 border-gray-200  hover:drop-shadow-[0_10px_15px_rgba(32,41,65,0.6)] w-1/5">
      <Link to={`/products/details/${product.productId}`}>
        <div className="h-56">
          <img
            className="rounded-t-lg h-full w-full object-cover"
            src={product.thumbnailUrl}
            alt={product.productId}
          />
        </div>
        <div className="p-5">
          <h6 className="mb-2 text-lg font-medium tracking-tight font-mono text-black truncate">
            {product.productName}
          </h6>
          <div className="flex items-center ">
            <img
              src={product.userImage}
              alt={product.userName}
              className="w-7 h-7 rounded-full object-cover"
            />
            <p className="font-normal text-gray-500 ml-2 truncate">
              {product.userName}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCardDisplay;
