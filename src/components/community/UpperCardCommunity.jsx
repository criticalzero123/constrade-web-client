import React from "react";
import { Link } from "react-router-dom";
import upper from "../../assets/home/upper.png";
import { BsPencilSquare } from "react-icons/bs";
const UpperCardCommunity = () => {
  return (
    <section className="grid lg:grid-cols-4  h-[35vh] rounded-2xl overflow-hidden mb-10">
      <div className="lg:col-span-2 bg-gradient-to-r from-[#B1DBE0]  to-[#F9D5F2] rounded-2xl lg:rounded-none">
        <div className="w-full  px-5 lg:px-14 py-5 ">
          <h1 className="font-poppins text-3xl font-semibold">
            Craft a{" "}
            <span
              className="bg-clip-text font-semibold  text-transparent bg-gradient-to-r from-[#3D4BA9] via-purple-500 to-[#EE661C]
                            "
            >
              Place
            </span>{" "}
            for everyone
          </h1>
          <div className="mt-5 font-poppins text-gray-600">
            <h3>Time to make a new place where gamers</h3>
            <h3>can trade and discuss with each other</h3>
          </div>
          <div className="flex flex-wrap  sm:mt-10 place-items-end">
            <Link
              to="/community/add"
              className="py-3 px-6 mt-5 sm:mt-0 bg-gray-100 mr-6 h-fit rounded-lg flex place-items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white  font-poppins
                              hover:text-orange-300"
            >
              <BsPencilSquare className="mr-2" />
              Create Community
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:col-span-2 lg:block h-full ">
        <img src={upper} alt="uppercover" className="h-full object-fit" />
      </div>
    </section>
  );
};

export default UpperCardCommunity;
