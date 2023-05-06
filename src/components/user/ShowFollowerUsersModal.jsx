import { Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { showFollowerUser } from "../../redux/action/followActions";
import { Link } from "react-router-dom";

const ShowFollowerUsersModal = ({ userId, show, onClose }) => {
  const [userList, setUserList] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await showFollowerUser(userId);
      setUserList(res);
    };

    fetch();
  }, [userId]);

  if (userList === undefined || userList.length === 0) return;

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>User Followers</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          {userList.map((user, index) => (
            <div className="flex space-x-2 items-center" key={index}>
              <img
                src={user.user.imageUrl}
                alt="user"
                className="w-10 h-10 rounded-full"
              />
              <Link
                className="text-base leading-relaxed text-gray-500 dark:text-gray-400 capitalize hover:text-[#CC481F]"
                to={`/users/o/${user.user.userId}`}
              >
                {user.person.firstName} {user.person.lastName}
              </Link>
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ShowFollowerUsersModal;
