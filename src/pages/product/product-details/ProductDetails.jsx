import React, { useState } from "react";
import { useParams } from "react-router";
import { useUserInfo } from "../../../hooks/useUserInfo";
import useGetProductId from "../../../hooks/messages/product/useGetProductId";
import { BsBookmarkHeartFill } from "react-icons/bs";
import ProductInfo from "../../../components/messages/product/ProductInfo";
import { Spinner } from "flowbite-react";
import { addFavorite } from "../../../redux/action/productActions";
const ProductDetails = () => {
  const { pid } = useParams();
  const { user } = useUserInfo();
  const { data, isFavorite, setIsFavorite } = useGetProductId(pid, user.userId);
  const [addingToFav, setAddingToFav] = useState(false);
  const [displayImage, setDisplayImage] = useState(null);

  const favoriteOnClick = async () => {
    if (user.userId !== data.product.posterUserId) {
      setAddingToFav(true);

      const info = {
        productId: data.product.productId,
        UserId: user.userId,
        date: new Date(),
      };

      await addFavorite(info);

      setIsFavorite(!isFavorite);
      setAddingToFav(false);
    }
  };

  if (data === undefined) return <p>Loading...</p>;

  return (
    <div className="container px-4">
      <div className="lg:grid lg:grid-cols-3  h-[90vh] p-5 ">
        <div className="lg:col-span-1 mb-5 lg:mb-0 relative rounded  shadow-lg mr-5 flex place-items-center justify-center text-black  bg-[#031533]">
          <div className="h-5/6">
            <img
              className="object-contain rounded h-[55vh]"
              src={
                displayImage !== null ? displayImage : data.product.thumbnailUrl
              }
              alt={data.product.title}
            />
          </div>
          <div className="mt-5 justify-center flex absolute bottom-0 p-5 w-full bg-[rgba(100%,100%,100%,0.6)] backdrop-blur-[30px]">
            {data.images.map((image, index) => (
              <img
                className="object-cover rounded h-20 cursor-pointer mr-3"
                src={image.imageURL}
                key={index}
                alt={index}
                onClick={() => setDisplayImage(image.imageURL)}
                onMouseEnter={() => setDisplayImage(image.imageURL)}
              />
            ))}
          </div>

          {/* For the favorites */}
          {user.userId !== data.product.posterUserId && (
            <div className="absolute top-0 w-full">
              <div className="flex justify-end ">
                {addingToFav ? (
                  <Spinner />
                ) : (
                  <BsBookmarkHeartFill
                    size={40}
                    className={`${
                      isFavorite && "text-red-600"
                    } text-gray-400 mr-1 hover:cursor-pointer `}
                    onClick={favoriteOnClick}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 lg:ml-5 ">
          <ProductInfo
            product={data.product}
            isBoosted={data.isBoosted}
            ownerUser={data.user}
            person={data.person}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
