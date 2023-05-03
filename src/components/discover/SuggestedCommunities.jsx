import React, { useEffect, useState } from "react";
import { useUserInfo } from "../../hooks/useUserInfo";
import { getCommunityPopular } from "../../redux/action/homeActions";
import CommunityCardDisplay from "../community-card/CommunityCardDisplay";
const SuggestedCommunities = () => {
  const { user } = useUserInfo();

  const [community, setCommunity] = useState();
  useEffect(() => {
    const fetch = async () => {
      const res = await getCommunityPopular(user.userId);

      setCommunity(res);
    };

    fetch();
  }, [user.userId]);

  if (community === undefined) return <p>Loading...</p>;

  if (community.length > 0)
    return (
      <div>
        Suggested Communities
        <div className="flex flex-wrap gap-x-4">
          {community.map((comm, index) => (
            <CommunityCardDisplay
              community={comm.community}
              isJoined={comm.isJoined}
              ownerImage={comm.ownerImage}
              ownerName={comm.ownerName}
              key={index}
            />
          ))}
        </div>
      </div>
    );
};

export default SuggestedCommunities;
