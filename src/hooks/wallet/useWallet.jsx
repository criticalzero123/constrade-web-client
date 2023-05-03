import { useEffect, useState } from "react";
import { useUserInfo } from "../../hooks/useUserInfo";
import {
  getAllTransactionWalletUser,
  getWalletUser,
} from "../../redux/action/walletActions";
export const useWallet = () => {
  const { user } = useUserInfo();
  const [wallet, setWallet] = useState();
  const [transactionsAll, setTransactionsAll] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await getWalletUser(user.userId);

      setWallet(res);
    };

    fetch();
  }, [user.userId]);

  useEffect(() => {
    if (wallet === undefined) return;

    const fetch = async () => {
      const res = await getAllTransactionWalletUser(wallet.walletId);
      const tempList = [...res.money, ...res.other]
        .sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        })
        .reverse();
      setTransactionsAll(tempList);
    };

    fetch();
  }, [wallet]);

  return { wallet, transactionsAll };
};
