import { useEffect, useState } from "react";
import { useUserInfo } from "../useUserInfo";
import {
  deleteFavorite,
  getFavoriteByUserId,
} from "../../redux/action/productActions";
export const useWishListByUser = () => {
  const { user } = useUserInfo();
  const [list, setList] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await getFavoriteByUserId(user.userId);

      setList(res);
    };

    fetch();
  }, [user.userId]);

  const deleteFavoriteById = async (favoriteId) => {
    const res = await deleteFavorite(favoriteId);

    if (res) {
      const newData = list.filter((f) => f.favoriteId !== favoriteId);

      setList(newData);
    } else {
      alert("Something went wrong in removing favorite.");
    }
  };

  return { list, deleteFavorite: deleteFavoriteById };
};
