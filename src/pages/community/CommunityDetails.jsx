import React, { useState } from "react";
import { useParams } from "react-router";
import useGetCommunity from "../../hooks/community/useGetCommunity";
import MembersModal from "../../components/community/MembersModal";
import { Button } from "flowbite-react";
import { useUserInfo } from "../../hooks/useUserInfo";
import useCommunity from "../../hooks/community/useCommunity";
import CommunityPosts from "../../components/community/CommunityPosts";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { ReportEnum } from "../../utilities/enums";
import { reportCommunity } from "../../redux/action/communityAction";

const CommunityDetails = () => {
  const { cid } = useParams();
  const { user } = useUserInfo();
  const { data, currentMember, refresh } = useGetCommunity(cid);
  const { join, deleteCommunityById } = useCommunity();
  const [showMembers, setShowMembers] = useState(false);

  if (data === undefined) return <p>Loading...</p>;

  const handleJoin = async () => {
    const res = await join(cid, user.userId);
    const resLower = res.toString().toLowerCase();

    if (resLower === "pending") {
      alert("Pending now.");
    } else if (resLower === "approved") {
      refresh();
    } else {
      alert("Rejected");
    }
  };

  const handleDeleteCommunity = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteCommunityById(cid, user.userId);
        console.log(res);
        if (res) {
          window.location.href = "/community";
        }
      }
    });
  };

  const onReport = async () => {
    const info = {
      reportedBy: user.userId,
      idReported: cid,
      reportType: ReportEnum.Community,
      description: "Something description",
      dateSubmitted: new Date(),
    };
    const res = await reportCommunity(info);
    if (res) {
      Swal.fire("Reported!", "Your report has been received!", "success");
    } else {
      alert("Error in reporting");
    }
  };

  return (
    <div className="container px-4 bg-gray-100 ">
      <img
        src={data.community.imageUrl}
        alt="mountain"
        className="rounded h-[25vh] w-full object-cover"
      />
      <div className="grid grid-cols-3">
        <div className="col-span-1 my-6  ">
          <div className="bg-white px-4 py-6 rounded-lg shadow-lg">
            <div className="mb-5">
              {currentMember ? (
                <div className="border border-[#CC481F] text-center py-2 px-4 text-[#CC481F] font-semibold rounded-lg cursor-pointer w-full ">
                  Joined
                </div>
              ) : (
                <div
                  className="bg-[#CC481F] text-center py-2 px-4 max-w-fit text-white font-semibold rounded-lg cursor-pointer "
                  onClick={handleJoin}
                >
                  Join
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <div>
                <h1 className="font-bold text-2xl">{data.community.name}</h1>
                <h3 className="text-lg text-gray-400">
                  {data.community.description}
                </h3>
              </div>
              <p className="text-gray-500">
                Created at{" "}
                {new Date(data.community.dateCreated).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-x-2 items-center">
              <p>Owned by:</p>
              {/* <img
              src={data.owner.user.imageUrl}
              alt="owner"
              className="w-10 h-10 rounded-full"
            /> */}
              <Link
                className="text-md hover:text-[#CC481F]"
                to={`/users/o/${data.owner.user.userId}`}
              >
                {data.owner.person.firstName} {data.owner.person.lastName}
              </Link>
            </div>
            <div className="mt-4"></div>
            <Button onClick={() => setShowMembers(true)}>Show Members</Button>

            <div className="mt-20">
              {user.userId === data.community.ownerUserId ? (
                <div className="grid grid-cols-2 gap-x-4">
                  <button
                    onClick={handleDeleteCommunity}
                    className="w-full py-3 text-center border border-[#CC481F] rounded text-[#CC481F] hover:bg-[#CC481F] hover:text-white"
                  >
                    Delete Community
                  </button>
                  <Link
                    to={`/community/details/${cid}/edit`}
                    state={data.community}
                  >
                    <p className="py-3 text-center  border border-[#CC481F] rounded text-[#CC481F] hover:bg-[#CC481F] hover:text-white">
                      Edit Community
                    </p>
                  </Link>
                </div>
              ) : (
                <div>
                  <button onClick={onReport}>REPORT COMMUNITY</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <CommunityPosts cid={cid} currentMember={currentMember} />
        </div>
      </div>
      <MembersModal
        cid={cid}
        show={showMembers}
        onClose={() => setShowMembers(false)}
        currentMember={currentMember}
        user={user}
      />
    </div>
  );
};

export default CommunityDetails;
