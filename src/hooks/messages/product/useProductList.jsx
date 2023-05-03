import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUserInfo } from "../../useUserInfo";
import { getProductChatByUserId } from "../../../redux/action/productMessageAction";

export default function useProductList() {
  const { user } = useUserInfo();
  const { data } = useSelector((state) => state.getProductChatByUserIdReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user === undefined || user === null) return;

    // Get the product chat
    dispatch(getProductChatByUserId(user.userId));
  }, []);

  return [data];
}
