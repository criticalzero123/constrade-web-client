import React from "react";
import { Link } from "react-router-dom";
import { VscSymbolMethod } from "react-icons/vsc";
const ProductCardDisplay = ({ product }) => {
  return (
    <Link
      to={`/products/details/${product.productId}`}
      className="rounded-lg hover:bg-gray-100 w-1/5 p-4"
    >
      <div className="h-56">
        <img
          className="rounded-t-lg h-full w-full object-cover shadow"
          src={product.thumbnailUrl}
          alt={product.productId}
        />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-x-2 items-center  w-full">
        <div className="w-full col-span-1">
          <img
            src={product.userImage}
            alt={product.userName}
            className="w-16 h-16 rounded-lg object-cover shadow-lg"
          />
        </div>
        <div className="w-full col-span-2">
          <h6 className="text-lg font-medium tracking-tight text-black truncate">
            {product.productName}
          </h6>
          <div className="flex items-center ">
            <p className="font-normal text-gray-500 truncate">
              {product.userName}
            </p>
          </div>
          <div className="flex items-center text-gray-500 capitalize text-sm">
            <p className="mr-1">{product.preferTrade}</p>
            <VscSymbolMethod className="mt-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCardDisplay;
