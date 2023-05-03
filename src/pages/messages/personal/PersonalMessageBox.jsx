import React, { useEffect, useRef, useState } from "react";
import useMessageHubConnection from "../../../hooks/messages/useMessageHubConnection";
import usePersonalMessage from "../../../hooks/messages/personal/usePersonalMessage";
import { useLocation, useParams } from "react-router";
import { useUserInfo } from "../../../hooks/useUserInfo";
import { Link } from "react-router-dom";
import UserMessageInput from "../../../components/messages/personal/UserMessageInput";

const PersonalMessageBox = () => {
  const { uid } = useParams();
  const { state } = useLocation();
  const { user } = useUserInfo();

  const [index, setIndex] = useState(0);
  const [messageList, setMessageList] = useState([]);
  const [firstFetch, setFirstFetch] = useState(true);
  const [onDelete, setOnDelete] = useState(false);
  const { sendMessage, message } = useMessageHubConnection();
  const [messageData, getMoreMessage, deleteMessage] = usePersonalMessage(
    uid,
    user.userId,
    0
  );

  const scrollDown = useRef(null);

  const onClickScrollDown = () => {
    scrollDown.current.scrollIntoView({ behavior: "smooth" });
  };

  //for fetching in database
  useEffect(() => {
    if (messageData === undefined) return;
    const reverseArray = [...messageData].reverse();
    if (onDelete) {
      setMessageList([...reverseArray]);
      setOnDelete(false);
      return;
    }

    if (firstFetch) {
      setMessageList([...messageList, ...reverseArray]);
      setFirstFetch(false);
      onClickScrollDown();
    } else {
      setMessageList([...reverseArray, ...messageList]);
    }
  }, [messageData, firstFetch, onDelete]);

  // This if for listening the message from hub
  useEffect(() => {
    if (message === undefined) return;
    setMessageList([...messageList, message]);
    onClickScrollDown();
  }, [message]);

  const onPress = () => {
    setIndex((prevIndex) => {
      getMoreMessage(index + 1);
      return prevIndex + 1;
    });
  };

  useEffect(() => {
    return () => {
      setMessageList([]);
    };
  }, [uid]);

  if (messageList === undefined) return <p>Loading...</p>;

  return (
    <div className="bg-[#EFF3F8] h-[87vh] rounded-md relative">
      <div className="h-[75vh] p-5 overflow-y-auto  rounded">
        {messageList.map((message, index) => (
          <div key={index}>
            {message.senderId === user.userId ? (
              <div>
                <div className="flex justify-end mt-5 mb-2 text-sm text-gray-400">
                  {/* {dateToTime(message.date.toDate())} */}
                </div>
                <div className=" flex justify-end">
                  <div className=" flex justify-end w-3/5">
                    <div className="text-end bg-[#CCE6FB]  p-3 rounded-l-2xl rounded-b-2xl max-w-fit">
                      {message.message}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center mt-7 text-sm ">
                  <Link to={`/users/o/${message.senderId}`}>
                    <img
                      src={state.user.imageUrl}
                      alt={state.user.imageUrl}
                      className="h-8 w-8 mr-2 object-cover rounded-full"
                    />
                  </Link>

                  <span className="ml-2 text-gray-500">
                    {/* {dateToTime(message.date.toDate())} */}
                  </span>
                </div>

                <div className="flex justify-start w-3/5">
                  <div className="text-start mr-3 bg-white mt-2 p-3 rounded-r-2xl rounded-b-2xl max-w-fit">
                    {message.message}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={scrollDown}></div>
      </div>
      <UserMessageInput
        sendMessage={(value) =>
          sendMessage(user.userId, state.user.userId, value)
        }
      />
    </div>
  );
};

export default PersonalMessageBox;
