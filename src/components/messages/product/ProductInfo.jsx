import React from "react";
import { useUserInfo } from "../../../hooks/useUserInfo";
import { Link } from "react-router-dom";
import ProductShare from "./ProductShare";
const ProductInfo = ({ product, ownerUser, person, isBoosted }) => {
  const { user } = useUserInfo();

  const toArrayString = (string) => {
    if (string !== undefined && string.indexOf(",") > -1) {
      return string.split(",");
    } else {
      return new Array(string);
    }
  };

  const gameGenreArray = product && toArrayString(product.gameGenre);
  const platformArray = product && toArrayString(product.platform);

  return (
    <div className=" bg-[#031533]  px-10 py-5 rounded h-full text-white">
      <div className="flex justify-between ">
        <p className="font-bold text-base font-mono text-orange-400 tracking-widest uppercase">
          {product.productStatus === "sold"
            ? "TRANSACTION SUCCESSFUL"
            : product.preferTrade}
        </p>
      </div>
      <div className="flex place-items-center">
        <p className="font-bold text-4xl font-mono mr-3">{product.title}</p>
        <p className="text-gray-400 font-semibold">({product.condition})</p>
      </div>
      <p className="text-sm text-gray-400 mb-2 mt-2">
        <span className="text-gray-200">Game Model Name: </span>
        {product.modelNumber}
      </p>
      <p className="text-sm text-gray-400 mb-2 mt-2">
        <span className="text-gray-200">Serial Number: </span>
        {product.serialNumber}
      </p>
      <p className=" text-gray-400 mb-2 mt-2">
        <span className="text-gray-200">More Details: </span>
        {product.description}
      </p>
      <div className="border-t border-b border-gray-600 py-3 font-bold text-2xl">
        {product.preferTrade === "cash" && <p>CASH: ₱{product.cash}</p>}
        {product.preferTrade === "swap" && <p>SWAP: {product.item}</p>}
        {product.preferTrade === "trade-in" && (
          <div className="flex">
            TRADE-IN:{" "}
            <p className={`mr-3 ${product.cash !== 0 ? "block" : "hidden"}`}>
              ₱{product.cash}
            </p>
            {product.item !== "" && product.cash !== 0 && " & "}
            <p className="ml-3">{product.item}</p>
          </div>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-8 ">
        <div className="h-full ">
          <div className="flex mt-3 place-items-center">
            <Link to={`/users/o/${ownerUser.userId}`}>
              <img
                src={ownerUser && ownerUser.imageUrl}
                alt={product.userName}
                className="rounded-full w-12 h-12 "
              />
            </Link>
            <div className="ml-3">
              <Link to={`/users/o/${ownerUser.userId}`}>
                <p className="font-semibold font-sans tracking-wider hover:text-red-500 capitalize">
                  {person.firstName} {person.lastName}
                </p>
              </Link>
              <p className="text-gray-500 font-semibold tracking-wide">
                Seller
              </p>
            </div>
          </div>
          <p className="mt-2 font-semibold text-lg">
            Location:{" "}
            <span
              className="text-base text-gray-500 hover:text-red-500 cursor-pointer capitalize"
              onClick={() =>
                window.open(
                  "http://maps.google.com/?q=" + product.location,
                  "_blank"
                )
              }
            >
              {product.location}
            </span>
          </p>
          <p className="mt-2 font-semibold text-lg">
            Item Posted:{" "}
            <span className="text-base text-gray-500">
              {new Date(product.dateCreated).toLocaleDateString()}
            </span>
          </p>
          <p className="mt-2 font-semibold text-lg">
            Delivery Method:{" "}
            <span className="text-base text-gray-500">
              {product.isDeliver && !product.isMeetup && "Delivery"}
            </span>
            <span className="text-base text-gray-500">
              {product.isMeetup && !product.isDeliver && "Meetup"}
            </span>
            <span className="text-base text-gray-500">
              {product.isMeetup && product.isDeliver && "Meetup & Delivery"}
            </span>
          </p>
        </div>
        <div className="h-full flex flex-col mt-3">
          <div>
            <p className="mb-2 font-semibold text-lg">Platform Supported: </p>
            {platformArray !== undefined &&
              platformArray.map((platform, index) => (
                <Link to={`/search/products/platform/${platform}`} key={index}>
                  <span className="inline-block bg-[rgba(100%,100%,100%,10%)] rounded-full px-3 py-1 text-sm font-semibold text-white   mr-2 mb-2 hover:text-red-400">
                    {platform}
                  </span>
                </Link>
              ))}
          </div>
          <div className="pt-4 pb-2">
            <p className="mb-2 font-semibold text-lg">Game Genre:</p>
            {gameGenreArray !== undefined &&
              gameGenreArray.map((category, index) => (
                <Link to={`/search/products/genre/${category}`} key={index}>
                  <span className="inline-block bg-[rgba(100%,100%,100%,10%)] text-white rounded-full px-3 py-1 text-sm font-semibold  mr-2 mb-2 hover:text-red-400">
                    {category}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </div>
      <div className="flex h-1/4 items-end">
        {user.userId !== product.posterUserId ? (
          product && product.productStatus === "sold" ? (
            <div className="w-full">
              <Link to={`/search/products/${product.title}`}>
                <button
                  type="button"
                  className="mt-5 text-white self-end
                  bg-gradient-to-r from-green-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500
                  w-full rounded-md p-3 font-semibold text-lg"
                >
                  Look for similar Items
                </button>
              </Link>
            </div>
          ) : (
            <div className="w-full">
              <Link
                to={`/messages/p/${product.productId}`}
                state={{ product: product, user: ownerUser }}
              >
                <button
                  disabled={product.productStatus === "sold"}
                  type="button"
                  className="mt-5 text-white self-end
                  bg-gradient-to-r from-green-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500
                  w-full rounded-md p-3 font-semibold text-sm md:text-lg"
                >
                  Contact Seller
                </button>
              </Link>
            </div>
          )
        ) : product && product.productStatus === "sold" ? (
          <Link
            to={"/products/add/search"}
            className="mt-5 text-white self-end
        bg-gradient-to-r from-green-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500
        w-full rounded-md p-3 font-semibold text-sm md:text-lg text-center"
          >
            Add another Item
          </Link>
        ) : (
          product && (
            <Link
              to={`/products/edit/${product.productId}`}
              state={product}
              className="w-full"
            >
              <button
                type="button"
                className="mt-5 text-white self-end
          bg-gradient-to-r from-green-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500
          w-full rounded-md p-3 font-semibold text-sm md:text-lg"
              >
                Edit Item
              </button>
            </Link>
          )
        )}
        <div className="w-full ml-5">
          <ProductShare title={product.title} />
          {product.productStatus !== "sold" &&
            product.posterUserId === user.userId && (
              <button
                className="mt-5 text-[#ea8e72] 
                  border-2 border-[#CC481F]
                    w-full rounded-md p-3 font-semibold text-sm md:text-lg"
                onClick={() =>
                  (window.location.href = `/products/details/${product.productId}/boost`)
                }
              >
                {isBoosted ? "Boosted" : "Boost"}
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
