import React from "react";
import { Link } from "react-router-dom";
import { useUserInfo } from "../../hooks/useUserInfo";
import { MdPublic } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
const CommunityCardDisplay = ({
  community,
  isJoined,
  ownerImage,
  ownerName,
}) => {
  const { user } = useUserInfo();
  return (
    <div className="rounded-lg border bg-gray-100 border-gray-100  hover:drop-shadow-[0_10px_15px_rgba(32,41,65,0.6)] w-1/5">
      <Link to={`/community/details/${community.communityId}`}>
        <div className="h-24 relative">
          <img
            className="rounded-t-lg h-full w-full object-cover"
            src={community.imageUrl}
            alt={community.communityId}
          />
          {isJoined && (
            <h6 className="absolute text-sm bottom-2 left-2 p-2 px-3 rounded text-white bg-[#CC481F]">
              Joined
            </h6>
          )}
        </div>
        <div className="p-5">
          <h6 className="text-xl font-medium tracking-tight text-black truncate mb-2">
            {community.name}
          </h6>
          <div className="flex items-center gap-x-1 text-gray-400 mb-1">
            <MdPublic />
            <h6 className="text-sm ml-2  truncate capitalize tracking-wider">
              {community.visibility} Group
            </h6>
          </div>
          <div className="flex items-center gap-x-1 text-gray-400 mb-1">
            <FiUsers />
            <h6 className="text-sm ml-2 truncate capitalize tracking-wider">
              {community.totalMembers} members
            </h6>
          </div>

          <div className="flex items-center mt-5">
            <img
              src={ownerImage}
              alt={ownerName}
              className="w-7 h-7 rounded-full object-cover"
            />
            <p className="font-normal text-gray-500 ml-2 truncate">
              by {user.userId === community.ownerUserId ? "you" : ownerName}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CommunityCardDisplay;
