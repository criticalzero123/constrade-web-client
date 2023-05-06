import React, { useState } from "react";
import { Outlet, useLocation } from "react-router";
import usePersonalList from "../../../hooks/messages/personal/usePersonalList";
import { Link } from "react-router-dom";
import UserSideDisplay from "../../../components/messages/UserSideDisplay";
import { getUserByName } from "../../../redux/action/userMessageAction";

const PersonalMessagesList = () => {
  const { data } = usePersonalList();
  // Search
  const [userSearch, setUserSearch] = useState("");
  const [timer, setTimer] = useState(null);
  const [usersChat, setUsersChat] = useState();
  // To get the current URL
  const location = useLocation();
  const splitName = location.pathname.split("/");
  const pathLength = splitName.length;

  const userSearchHandler = (e) => {
    const query = e.target.value;
    setUserSearch(query);

    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(async () => {
        if (query.toString().trim() !== "") {
          const res = await getUserByName(query);
          setUsersChat(res);
        }
      }, 500)
    );
  };

  if (data === undefined) return <p>Loading...</p>;

  return (
    <div className="sm:grid sm:grid-cols-6 sm:gap-4">
      <aside
        className={`${
          pathLength > 3 && "hidden sm:block"
        } sm:col-span-2 w-full overflow-y-auto h-[88vh] bg-[#F5F7FB] p-5 rounded`}
      >
        <div className="grid grid-cols-2 mb-5">
          <div className="flex justify-center">
            <Link
              to="/messages/u"
              className="text-orange-500 font-poppins font-semibold border-b-2 border-b-orange-500 "
            >
              Users
            </Link>
          </div>
          <div className="flex justify-center">
            <Link
              to="/messages/p"
              className=" hover:text-blue-500 font-poppins"
            >
              Products
            </Link>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          value={userSearch}
          onChange={userSearchHandler}
          placeholder="Search Name..."
          className="w-full mb-5 rounded-full border-1 border-gray-200 shadow-lg text-sm"
        />
        {userSearch.toString().trim() !== "" &&
          (usersChat !== undefined && usersChat.length !== 0 ? (
            usersChat.map((userChat, index) => (
              <Link
                to={`${userChat.user.userId}`}
                state={{ user: userChat.user }}
                key={index}
              >
                <UserSideDisplay user={userChat.user} chat={userChat} />
              </Link>
            ))
          ) : (
            <div>No users found</div>
          ))}

        {/* Chat logs */}
        {userSearch.toString().trim() === "" &&
          data.map((chat, index) => (
            <Link
              key={index}
              to={`${chat.user.userId}`}
              state={{ user: chat.user }}
            >
              <UserSideDisplay user={chat.user} chat={chat} />
            </Link>
          ))}
      </aside>
      <div className={`${pathLength < 4 && "hidden sm:block"} sm:col-span-4 `}>
        {pathLength < 4 && (
          <div className="text-black h-[88vh] bg-[#F5F7FB] flex place-items-center justify-center text-4xl">
            Select Conversation
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default PersonalMessagesList;
