import { useEffect, useState } from "react";
import { getAllWalletUser } from "../../redux/action/walletActions";

export default function useGetAllWalletUser() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await getAllWalletUser();
      setData(res);
    };

    fetch();
  }, []);

  return [data];
}
