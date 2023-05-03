import React from "react";
import { Outlet, useLocation } from "react-router";
import { Link } from "react-router-dom";
import useProductList from "../../../hooks/messages/product/useProductList";
import UserSideDisplay from "../../../components/messages/UserSideDisplay";

const ProductMessagesList = () => {
  const [productMessage] = useProductList();
  // To get the current URL
  const location = useLocation();
  const splitName = location.pathname.split("/");
  const pathLength = splitName.length;

  if (productMessage === undefined) return <p>Loading...</p>;

  if (productMessage.length === 0) return <p>No chat logs found...</p>;

  return (
    <div className="sm:grid sm:grid-cols-6 sm:gap-4">
      <aside
        className={`${
          pathLength > 3 && "hidden sm:block"
        } sm:col-span-2 w-full overflow-y-auto h-[88vh] bg-[#F5F7FB] p-5 rounded`}
      >
        <div className="grid grid-cols-2 mb-5">
          <div className="flex justify-center">
            <Link className="hover:text-blue-500 font-poppins" to="/messages/u">
              Users
            </Link>
          </div>
          <div className="flex justify-center">
            <Link
              to="/messages/p"
              className="  text-orange-500 font-poppins font-semibold border-b-2 border-b-orange-500"
            >
              Products
            </Link>
          </div>
        </div>

        {/* Chat logs */}
        {productMessage.map((chat, index) => (
          <Link
            key={index}
            to={`${chat.product.productId}`}
            state={{ user: chat.user, product: chat.product ?? null }}
          >
            <UserSideDisplay
              user={chat.user}
              chat={chat}
              product={chat.product}
            />
          </Link>
        ))}
      </aside>
      <div className={`${pathLength < 4 && "hidden sm:block"} sm:col-span-4 `}>
        {pathLength < 4 && (
          <div className="text-black h-[88vh] bg-[#F5F7FB] flex place-items-center justify-center text-4xl">
            Select Conversation
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default ProductMessagesList;
