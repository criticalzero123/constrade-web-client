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

  return (
    <div className="container px-4">
      <div>
        <img
          src={data.community.imageUrl}
          alt="mountain"
          className="rounded h-[25vh] w-full object-cover"
        />
        <h1 className="font-bold text-2xl">{data.community.name}</h1>
        <h3 className="text-lg">{data.community.description}</h3>
        <div className="flex gap-x-2 items-center">
          <img
            src={data.owner.user.imageUrl}
            alt="owner"
            className="w-10 h-10 rounded-full"
          />
          <h3 className="text-md">
            Owned by: {data.owner.person.firstName} {data.owner.person.lastName}
          </h3>
        </div>
        <Button onClick={() => setShowMembers(true)}>Show Members</Button>
        <p>
          Created at {new Date(data.community.dateCreated).toLocaleDateString()}
        </p>
        {currentMember ? (
          <div className="border border-[#CC481F] text-center py-2 px-4 max-w-fit text-[#CC481F] font-semibold rounded-lg cursor-pointer ">
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
        <div className="mt-10"></div>
        {user.userId === data.community.ownerUserId && (
          <div>
            <button onClick={handleDeleteCommunity}>DELETE COMMUNITY</button>
            <br />
            <Link to={`/community/details/${cid}/edit`} state={data.community}>
              EDIT COMMUNITY
            </Link>
          </div>
        )}
        <div className="mt-10"></div>
        <CommunityPosts cid={cid} currentMember={currentMember} />
      </div>
      <MembersModal
        cid={cid}
        show={showMembers}
        onClose={() => setShowMembers(false)}
        currentMember={currentMember}
      />
    </div>
  );
};

export default CommunityDetails;
