import React from "react";
import { useProductByUser } from "../../../hooks/product/useProductByUser";
import { VscSymbolMethod } from "react-icons/vsc";

import { Link } from "react-router-dom";
const OtherUserProfileProductList = ({ id }) => {
  const [products] = useProductByUser(id);

  if (products === undefined) return <p>Loading...</p>;

  if (products.length === 0)
    return (
      <div>
        <p>He got no items.</p>
      </div>
    );

  return (
    <div>
      <p>
        Results: <span className="font-semibold">({products.length})</span>
      </p>
      <br />
      <div className=" flex flex-wrap h-[72vh] gap-x-4">
        {products.map((product, index) => (
          <Link
            to={`/products/details/${product.productId}`}
            className="rounded-lg bg-gray-100 hover:bg-[#cc471f15] p-4 h-[35vh]"
            key={index}
          >
            <img
              className="rounded-t-lg w-full h-32 object-cover shadow"
              src={product.thumbnailUrl}
              alt={product.productId}
            />
            <div className="mt-5 flex gap-x-2 items-center">
              <div>
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
        ))}
      </div>
    </div>
  );
};

export default OtherUserProfileProductList;
