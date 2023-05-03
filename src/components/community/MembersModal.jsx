import { Modal } from "flowbite-react";
import React from "react";
import useCommunityMembers from "../../hooks/community/useCommunityMembers";
import { Link } from "react-router-dom";
import { MdPersonRemoveAlt1 } from "react-icons/md";
import { CommunityRole } from "../../utilities/enums";
const MembersModal = ({ show, onClose, cid, currentMember, user }) => {
  const [members, removeMember] = useCommunityMembers(cid);
  if (members === undefined) return <p>Loading...</p>;
  console.log(members);
  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Community Members</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          {members.map((member, index) => (
            <div key={index} className="flex justify-between">
              <div className="flex gap-x-4 items-center hover:text-[#CC481F]">
                <img
                  src={member.userImageUrl}
                  alt={index}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => {
                    if (user.userId !== member.member.userId) {
                      window.location.href = `/users/o/${member.member.userId}`;
                    }
                  }}
                />
                <Link
                  to={
                    user.userId !== member.member.userId &&
                    `/users/o/${member.member.userId}`
                  }
                  className="capitalize"
                >
                  {member.userName}
                </Link>
              </div>
              {currentMember &&
                currentMember.role === CommunityRole.Owner &&
                currentMember.userId !== member.member.userId && (
                  <div
                    className="flex items-center gap-x-2 hover:text-red-500 cursor-pointer"
                    onClick={() =>
                      removeMember(member.member.communityMemberId)
                    }
                  >
                    <MdPersonRemoveAlt1 size={20} />
                    <p>remove</p>
                  </div>
                )}
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MembersModal;
