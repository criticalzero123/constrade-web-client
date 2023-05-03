import React, { useEffect, useState } from "react";
import { getPopularProduct } from "../../redux/action/homeActions";
import ProductCardDisplay from "../product-card/ProductCardDisplay";

const JustForYou = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await getPopularProduct(4);

      setProducts(res);
    };

    fetch();
  }, []);

  if (products === undefined) return <p>Loading...</p>;

  if (products.length > 0)
    return (
      <div>
        <p>Just for you</p>
        <div className="flex flex-wrap gap-x-4">
          {products.map((product, index) => (
            <ProductCardDisplay product={product} key={index} />
          ))}
        </div>
      </div>
    );
};

export default JustForYou;
