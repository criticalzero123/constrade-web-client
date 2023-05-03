import { useEffect } from "react";

import { useState } from "react";
import {
  getCommunityMembers,
  removeCommunityMemberById,
} from "../../redux/action/communityAction";
import Swal from "sweetalert2";

export default function useCommunityMembers(communityId) {
  const [data, setData] = useState();

  useEffect(() => {
    if (communityId === undefined) return;

    const fetch = async () => {
      const res = await getCommunityMembers(communityId);

      if (res) {
        setData(res);
      }
    };

    fetch();
  }, [communityId]);

  const removeMember = async (memberId) => {
    const res = await removeCommunityMemberById(communityId, memberId);

    if (res) {
      const newMembers = data.filter(
        (m) => m.member.communityMemberId !== memberId
      );
      setData(newMembers);
      Swal.fire({
        title: "Info",
        text: "Member Removed Successfully.",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
      });
    }
  };

  return [data, removeMember];
}
