import React, { useState } from "react";
import { useParams } from "react-router";
import useSearchPlatform from "../../../hooks/home/useSearchPlatform";
import ProductCardDisplay from "../../../components/product-card/ProductCardDisplay";

const ProductsSearchPlatform = () => {
  const { query } = useParams();
  const [result, genreList] = useSearchPlatform(query);
  const [genre, setGenre] = useState("");

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
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          {genreList.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-x-4">
        {genre === "all"
          ? result.map((product, index) => (
              <ProductCardDisplay product={product} key={index} />
            ))
          : result
              .filter((p) => p.genre.toLowerCase().includes(genre))
              .map((product, index) => (
                <ProductCardDisplay product={product} key={index} />
              ))}
      </div>
    </div>
  );
};

export default ProductsSearchPlatform;
