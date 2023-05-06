import React, { useState } from "react";
import { useParams } from "react-router";
import useGetUserById from "../../hooks/useGetUserById";
import { useUserInfo } from "../../hooks/useUserInfo";
import { Card, Tabs } from "flowbite-react";
import { AiOutlineMessage } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { MdVerified } from "react-icons/md";
import useUserFollowAndFollowers from "../../hooks/follow/useUserFollowAndFollowers";
import { Link } from "react-router-dom";
import FollowUserProfile from "../../components/user/FollowUserProfile";
import OtherUserProfileReview from "./OtherUserProfileReview";
import UserProfileTransactionList from "../../pages/user/UserProfileTransactionList";
import OtherUserProfileProductList from "../../components/messages/product/OtherUserProfileProductList";
import ShowFollowedUsersModal from "../../components/user/ShowFollowedUsersModal";
import ShowFollowerUsersModal from "../../components/user/ShowFollowerUsersModal";
const OtherUserProfile = () => {
  const { uid } = useParams();
  const { user } = useUserInfo();
  const [otherUser] = useGetUserById(uid);
  const [data] = useUserFollowAndFollowers(uid);
  const [showFollower, setShowFollower] = useState(false);
  const [showFollowed, setShowFollowed] = useState(false);

  if (otherUser === undefined || data === undefined) return <p>Loading...</p>;

  return (
    <div className="container px-4">
      <div className="flex justify-center flex-wrap md:grid md:grid-cols-3 gap-4 lg:gap-0  h-[90vh] lg:h-[88vh]">
        <div>
          <div className="max-w-sm mb-5  md:block">
            <Card>
              <div className="flex flex-col items-center pb-10">
                <img
                  className="mb-3 h-24 w-24 rounded-full shadow-xl object-cover"
                  src={otherUser.user.imageUrl}
                  alt={otherUser.user.firstName}
                />
                <div className="text-sm flex text-gray-500 dark:text-gray-400 mb-2">
                  <MdVerified size={20} color={"orange"} className="mr-1" />
                  <p className="capitalize">{otherUser.user.userType}</p>
                </div>
                <h5 className="mb-1 text-xl flex text-center font-medium text-gray-900 dark:text-white capitalize">
                  {otherUser.person.firstName} {otherUser.person.lastName}
                </h5>
                <h6 className="mb-4 text-gray-400">{otherUser.user.email}</h6>
                <div className="grid grid-cols-2  w-full text-center border-t pt-2 mx-3 border-t-gray-100">
                  <div className="flex flex-col">
                    <div className="w-full  flex justify-center">
                      <p className="font-poppins">Following</p>
                    </div>

                    <div className="w-full  flex justify-center">
                      <p
                        className="text-gray-500 hover:text-orange-500  max-w-fit cursor-pointer"
                        onClick={() => setShowFollowed(true)}
                      >
                        {data ? data.followedCount : 0}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="w-full  flex justify-center">
                      <p className="font-poppins">Followers</p>
                    </div>

                    <div className="w-full  flex justify-center">
                      <p
                        className="text-gray-500 hover:text-orange-500  max-w-fit cursor-pointer"
                        onClick={() => setShowFollower(true)}
                      >
                        {data ? data.followCount : 0}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 lg:mt-6 w-full px-10 md:px-0 lg:px-10">
                  <Link
                    to={`/messages/u/${uid}`}
                    state={{ user: otherUser.user }}
                    className="flex cursor-pointer justify-center place-items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 "
                  >
                    <AiOutlineMessage className="mr-2" size={20} />
                    Message
                  </Link>
                  <FollowUserProfile
                    otherUserId={uid}
                    currentUserId={user.userId}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="col-span-2 shadow-lg md:h-[88vh] h-screen w-full">
          <Tabs.Group>
            <Tabs.Item title="Reviews" icon={AiFillStar}>
              <OtherUserProfileReview id={otherUser.user.userId} />
            </Tabs.Item>
            <Tabs.Item title="Transactions" icon={GrTransaction}>
              <UserProfileTransactionList id={otherUser.user.userId} />
            </Tabs.Item>
            <Tabs.Item title="Products" icon={GrTransaction}>
              <OtherUserProfileProductList id={otherUser.user.userId} />
            </Tabs.Item>
          </Tabs.Group>
        </div>
      </div>
      <ShowFollowedUsersModal
        userId={otherUser.user.userId}
        show={showFollowed}
        onClose={() => setShowFollowed(false)}
      />
      <ShowFollowerUsersModal
        userId={otherUser.user.userId}
        show={showFollower}
        onClose={() => setShowFollower(false)}
      />
    </div>
  );
};

export default OtherUserProfile;
