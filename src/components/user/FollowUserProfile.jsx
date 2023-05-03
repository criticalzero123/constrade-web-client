import { Spinner } from "flowbite-react";
import React from "react";
import useFollowAction from "../../hooks/follow/useFollowAction";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
const FollowUserProfile = ({ otherUserId, currentUserId }) => {
  const { followAction, isFollow, loading } = useFollowAction(
    otherUserId,
    currentUserId
  );
  if (isFollow === undefined || loading)
    return (
      <div className="flex justify-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 ">
        <Spinner />
      </div>
    );

  return (
    <div>
      <button
        onClick={followAction}
        className="flex justify-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 "
      >
        {isFollow ? (
          <>
            <AiOutlineUserDelete className="mr-2" size={20} />
            Unfollow
          </>
        ) : (
          <>
            <AiOutlineUserAdd className="mr-2" size={20} />
            Follow
          </>
        )}
      </button>
    </div>
  );
};

export default FollowUserProfile;
