import React, { useState } from "react";
import { useParams } from "react-router";
import ProductCardDisplay from "../../../components/product-card/ProductCardDisplay";
import useSearchHome from "../../../hooks/home/useSearchHome";

const ProductsSearch = () => {
  const { query } = useParams();
  const [result, platformList] = useSearchHome(query);
  const [platform, setPlatform] = useState("");

  if (result === undefined) return <p className="px-4">Loading...</p>;

  if (result.products.length === 0)
    return (
      <p className="px-4">
        No result found in <span className="font-semibold">{query}</span>{" "}
        products.
      </p>
    );

  return (
    <div className="container px-4">
      <h6>Search Results: {result.products.length}</h6>

      <div className="flex gap-x-4 items-center my-5">
        <p>Search by:</p>
        <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
          {platformList.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-x-4">
        {platform === "all"
          ? result.products.map((product, index) => (
              <ProductCardDisplay product={product} key={index} />
            ))
          : result.products
              .filter((p) => p.platform.toLowerCase().includes(platform))
              .map((product, index) => (
                <ProductCardDisplay product={product} key={index} />
              ))}
      </div>
    </div>
  );
};

export default ProductsSearch;
