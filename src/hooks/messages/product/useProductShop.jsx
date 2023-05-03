import { useEffect, useState } from "react";
import { getShopFromName } from "../../../redux/action/priceActions";

export default function useProductShop() {
  const [shop, setShop] = useState();

  useEffect(() => {
    return () => setShop();
  }, []);

  const fetch = async (name) => {
    const res = await getShopFromName(name);
    setShop(res);
  };

  return [fetch, shop];
}
