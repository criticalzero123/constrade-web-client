import { useEffect, useState } from "react";
import { getPricesFromQuery } from "../../../redux/action/priceActions";

const useProductPrices = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    return () => setProducts();
  }, []);

  const fetch = async (query) => {
    const res = await getPricesFromQuery(query);
    setProducts(res);
  };

  return [fetch, products];
};

export default useProductPrices;
