import React, { useState } from "react";
import { useParams } from "react-router";
import useSearchGenre from "../../../hooks/home/useSearchGenre";
import ProductCardDisplay from "../../../components/product-card/ProductCardDisplay";

const ProductsSearchGenre = () => {
  const { query } = useParams();
  const [result, platformList] = useSearchGenre(query);
  const [platform, setPlatform] = useState("");

  if (result === undefined) return <p className="px-4">Loading...</p>;

  if (result.length === 0)
    return (
      <p className="px-4">
        No result found in <span className="font-semibold">{query}</span> genre
        products.
      </p>
    );

  return (
    <div className="container px-4">
      <h6>Search Results: {result.length}</h6>

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
          ? result.map((product, index) => (
              <ProductCardDisplay product={product} key={index} />
            ))
          : result
              .filter((p) => p.platform.toLowerCase().includes(platform))
              .map((product, index) => (
                <ProductCardDisplay product={product} key={index} />
              ))}
      </div>
    </div>
  );
};

export default ProductsSearchGenre;
