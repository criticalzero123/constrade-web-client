import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import {
  deleteProductMessage,
  getProductMessages,
} from "../../../redux/action/productMessageAction";

export default function useProductMessages(userId, userId2, productId, index) {
  const dispatch = useDispatch();
  const [messageList, setMessageList] = useState([]);
  const { data } = useSelector((state) => state.getProductMessagesReducer);

  useEffect(() => {
    dispatch(getProductMessages(userId, userId2, productId, index));

    return () => {
      dispatch({ type: "GET_PRODUCT_MESSAGES_LEAVE" });
    };
  }, [userId, userId2, productId]);

  useEffect(() => {
    if (data === undefined) return;
    setMessageList(data);
  }, [data]);

  const getMoreMessage = (indexNumber) => {
    dispatch(getProductMessages(userId, userId2, productId, indexNumber));
  };

  const deleteMessage = async (id) => {
    const res = await deleteProductMessage(id);

    if (res) {
      alert("Successfully Deleted");
      const newMessageList = messageList.filter(
        (c) => c.productMessageId !== id
      );

      setMessageList(newMessageList);
    } else {
      alert("Unable to delete. Something went wrong");
    }
  };

  return [messageList, getMoreMessage, deleteMessage];
}
