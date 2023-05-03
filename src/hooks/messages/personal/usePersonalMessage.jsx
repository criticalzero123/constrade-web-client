import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMessageById,
  getMessagesByUserIds,
} from "../../../redux/action/userMessageAction";

const usePersonalMessage = (userId1, userId2, index) => {
  const dispatch = useDispatch();
  const [messageList, setMessageList] = useState([]);
  const { data } = useSelector((state) => state.getMessagesByUserIdsReducer);

  useEffect(() => {
    dispatch(getMessagesByUserIds(userId1, userId2, index));

    return () => {
      dispatch({ type: "GET_MESSAGES_BY_USER_IDS_LEAVE" });
    };
  }, [userId1, userId2, dispatch, index]);

  useEffect(() => {
    if (data === undefined) return;
    setMessageList(data);
  }, [data]);

  const getMoreMessage = (indexNumber) => {
    dispatch(getMessagesByUserIds(userId1, userId2, indexNumber));
  };

  const deleteMessage = async (id) => {
    const res = await deleteMessageById(id);

    if (res) {
      alert("Successfully deleted.");
      const newMessageList = messageList.filter((c) => c.userMessageId !== id);

      setMessageList(newMessageList);
    } else {
      alert("Unable to delete");
    }
  };

  return [messageList, getMoreMessage, deleteMessage];
};

export default usePersonalMessage;
