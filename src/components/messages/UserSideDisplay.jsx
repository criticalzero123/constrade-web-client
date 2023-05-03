import React from "react";

const UserSideDisplay = ({ chat, user, product }) => {
  return (
    <div
      className={`grid grid-cols-6 h-20 place-items-center rounded cursor-pointer p-1 bg-gray-100 text-black hover:bg-gray-200`}
    >
      <div className="col-span-1 w-full flex justify-center ">
        <img
          src={user.imageUrl}
          alt={chat.otherUserName}
          className="h-14 w-14 rounded-full object-cover"
        />
      </div>
      {product !== undefined ? (
        <div className="col-span-5 w-11/12 flex justify-between">
          <div>
            <p className="text-ellipsis overflow-hidden whitespace-nowrap w-11/12 md:w-32 lg:w-full text-orange-600 font-bold">
              {product.title}
            </p>
            <p className="text-ellipsis  overflow-hidden whitespace-nowrap w-11/12 md:w-32 lg:w-full text-gray-400">
              {chat.otherUserName}
            </p>
          </div>
          <div>
            <img
              src={product.thumbnailUrl}
              alt={product.title}
              className="h-10"
            />
          </div>
        </div>
      ) : (
        <div className="col-span-5 w-11/12">
          <div>
            <p className="text-ellipsis overflow-hidden whitespace-nowrap w-11/12 md:w-32 lg:w-full text-orange-600 font-bold">
              {chat.otherUserName}
            </p>
            <p className="text-ellipsis  overflow-hidden whitespace-nowrap w-11/12 md:w-32 lg:w-full text-gray-400">
              {user.email}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSideDisplay;
