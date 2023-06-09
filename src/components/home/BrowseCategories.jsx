import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiTrade } from "react-icons/gi";
import { AiOutlineSwap } from "react-icons/ai";
import { HiCash } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { getMatchProductSearch } from "../../redux/action/homeActions";
const BrowseCategories = () => {
  const [query, setQuery] = useState("");

  const handleSearchProduct = async (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    const res = await getMatchProductSearch(query);

    if (res === "genre") {
      window.location.href = `/search/products/genre/${query}`;
    } else if (res === "platform") {
      window.location.href = `/search/products/platform/${query}`;
    } else {
      window.location.href = `/search/products/${query}`;
    }
  };
  return (
    <div className="my-10 flex justify-between">
      <div className="flex gap-x-4">
        <Link
          to={"/search/method/trade-in"}
          className="flex px-6 py-2 border border-gray-300 text-gray-500 font-semibold rounded-lg hover:bg-[#CC481F] hover:text-white max-w-fit items-center"
        >
          <GiTrade className="mr-3" />
          Trade-In
        </Link>

        <Link
          className="px-8 py-2 border border-gray-300 text-gray-500 font-semibold rounded-lg hover:bg-[#CC481F] hover:text-white flex max-w-fit items-center"
          to={"/search/method/swap"}
        >
          <AiOutlineSwap className="mr-3" />
          Swap
        </Link>
        <Link
          className="px-8 py-2 border border-gray-300 text-gray-500 font-semibold rounded-lg hover:bg-[#CC481F] hover:text-white flex max-w-fit items-center"
          to={"/search/method/cash"}
        >
          <HiCash className="mr-3" />
          Cash
        </Link>
      </div>
      <div>
        <form onSubmit={handleSearchProduct} className="flex justify-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for console games"
            className="border py-2 px-4 w-full rounded focus:shadow-lg "
          />
          <button className="ml-4 border px-4 bg-gray-100 rounded-lg hover:text-[#CC481F] text-black ">
            <BsSearch />
          </button>
        </form>
      </div>
    </div>
  );
};

export default BrowseCategories;
