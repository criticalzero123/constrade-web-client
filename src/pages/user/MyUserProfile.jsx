import React, { useEffect, useState } from "react";
import { useUserInfo } from "../../hooks/useUserInfo";
import { Card, Spinner, Tabs } from "flowbite-react";

import { AiFillStar } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { MdVerified } from "react-icons/md";
import useUserFollowAndFollowers from "../../hooks/follow/useUserFollowAndFollowers";
import UserProfileReviews from "./UserProfileReviews";
import UserProfileTransactionList from "./UserProfileTransactionList";
import SubscriptionModal from "../../components/user/SubscriptionModal";
import VerificationModal from "../../components/user/VerificationModal";
import CancelSubscriptionModal from "../../components/user/CancelSubscriptionModal";
import { AiOutlineEdit } from "react-icons/ai";
import { getUserInfo, getUserType } from "../../redux/action/userActions";
import { useDispatch } from "react-redux";
import ShowFollowedUsersModal from "../../components/user/ShowFollowedUsersModal";
import ShowFollowerUsersModal from "../../components/user/ShowFollowerUsersModal";
const MyUserProfile = () => {
  const { user, person } = useUserInfo();
  const [show, setShow] = useState(false);
  const [showCancelSub, setShowCancelSub] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [data] = useUserFollowAndFollowers(user.userId);
  const dispatch = useDispatch();
  const [userType, setUserType] = useState("");
  const [showFollower, setShowFollower] = useState(false);
  const [showFollowed, setShowFollowed] = useState(false);

  useEffect(() => {
    if (user === undefined) return;
    const fetch = async () => {
      const res = await getUserType(user.userId);

      if (res) {
        const newUserInfo = {
          user: { ...user, userType: res },
          person: { ...person },
        };
        dispatch(
          getUserInfo({ user: newUserInfo.user, person: newUserInfo.person })
        );

        setUserType(res);
      }
    };

    fetch();
  }, [dispatch]);

  return (
    <div className="container px-4">
      <div className="flex justify-center flex-wrap md:grid md:grid-cols-3 gap-4 lg:gap-0  h-[90vh] lg:h-[88vh]">
        <div>
          <div className="max-w-sm mb-5  md:block">
            <Card>
              <div className="flex flex-col items-center pb-10">
                <img
                  className="mb-3 h-24 w-24 rounded-full shadow-xl object-cover"
                  src={user.imageUrl}
                  alt={user.firstName}
                />
                <div className="text-sm flex text-gray-500 dark:text-gray-400 mb-2">
                  <MdVerified size={20} color={"orange"} className="mr-1" />
                  <p className="capitalize">
                    {userType === "" ? <Spinner /> : userType}
                  </p>
                </div>
                <h5 className="mb-1 text-xl flex text-center font-medium text-gray-900 dark:text-white capitalize items-center">
                  {person.firstName} {person.lastName}{" "}
                  <span
                    className="ml-2 cursor-pointer hover:text-[#CC481F] text-gray-400"
                    onClick={() => (window.location.href = "/users/my/edit")}
                  >
                    <AiOutlineEdit />
                  </span>
                </h5>
                <h6 className="mb-4 text-gray-400">{user.email}</h6>
                <div className="grid grid-cols-2  w-full text-center border-t pt-2 mx-3 border-t-gray-100">
                  <div className="flex flex-col">
                    <div className="w-full  flex justify-center">
                      <p className="font-poppins">Follower</p>
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
                  <div>
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
                </div>
              </div>
              <div className="w-full ">
                {user.userType === "semi-verified" && (
                  <p
                    className="text-center bg-[#CC481F] py-3 rounded text-white cursor-pointer"
                    onClick={() => setShowVerification(true)}
                  >
                    Verify Account
                  </p>
                )}

                {user.userType !== "premium" &&
                  user.userType === "verified" && (
                    <p
                      className=" bg-[#CC481F] py-3 rounded text-white text-center p-4 font-semibold w-full cursor-pointer"
                      onClick={() => setShow(true)}
                    >
                      Be a premium member
                    </p>
                  )}

                {user.userType === "premium" && (
                  <p
                    className=" bg-[#CC481F] py-3 rounded text-white text-center p-4 font-semibold w-full cursor-pointer"
                    onClick={() => setShowCancelSub(true)}
                  >
                    Cancel Subscription
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
        <div className="col-span-2 shadow-lg md:h-[88vh] h-screen w-full">
          <Tabs.Group>
            <Tabs.Item title="Reviews" icon={AiFillStar}>
              <UserProfileReviews />
            </Tabs.Item>
            <Tabs.Item title="Transactions" icon={GrTransaction}>
              <UserProfileTransactionList id={user.userId} />
            </Tabs.Item>
          </Tabs.Group>
        </div>
      </div>
      <SubscriptionModal show={show} onClose={() => setShow(false)} />
      <CancelSubscriptionModal
        show={showCancelSub}
        onClose={() => setShowCancelSub(false)}
      />
      <VerificationModal
        show={showVerification}
        onClose={() => setShowVerification(false)}
      />
      <ShowFollowedUsersModal
        userId={user.userId}
        show={showFollowed}
        onClose={() => setShowFollowed(false)}
      />
      <ShowFollowerUsersModal
        userId={user.userId}
        show={showFollower}
        onClose={() => setShowFollower(false)}
      />
    </div>
  );
};

export default MyUserProfile;
