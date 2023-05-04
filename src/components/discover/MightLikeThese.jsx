import React, { useEffect, useState } from "react";
import { getBoostedProducts } from "../../redux/action/homeActions";
import ProductCardDisplay from "../product-card/ProductCardDisplay";

const MightLikeThese = () => {
  const [boosted, setBoosted] = useState();
  useEffect(() => {
    const fetch = async () => {
      const res = await getBoostedProducts();

      setBoosted(res);
    };

    fetch();
  }, []);

  if (boosted === undefined) return <p>Loading...</p>;

  if (boosted.length > 0)
    return (
      <div className="mt-10">
        <p className="font-semibold text-2xl text-gray-800">Might Like These</p>
        <p className="text-sm text-gray-400 mb-6">
          Console games that are hot!
        </p>
        <div className="flex flex-wrap gap-x-4">
          {boosted.map((product, index) => (
            <ProductCardDisplay product={product} key={index} />
          ))}
        </div>
      </div>
    );
};

export default MightLikeThese;
