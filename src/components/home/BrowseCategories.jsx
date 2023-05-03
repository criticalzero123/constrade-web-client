import React from "react";
import { Link } from "react-router-dom";

const BrowseCategories = () => {
  return (
    <div>
      <h3>Browse by categories</h3>
      <div>
        <Link className="mx-3" to={"/search/method/trade-in"}>
          Trade-In
        </Link>
        <Link className="mx-3" to={"/search/method/swap"}>
          Swap
        </Link>
        <Link className="mx-3" to={"/search/method/cash"}>
          Cash
        </Link>
      </div>
    </div>
  );
};

export default BrowseCategories;
