import React from "react";
import { useParams } from "react-router";
import useSearchCommunity from "../../../hooks/community/useSearchCommunity";
import { useUserInfo } from "../../../hooks/useUserInfo";
import CommunityCardDisplay from "../../../components/community-card/CommunityCardDisplay";

const CommunitySearch = () => {
  const { query } = useParams();
  const { user } = useUserInfo();
  const [result] = useSearchCommunity(query, user.userId);

  if (result === undefined) return <p className="px-4">Loading...</p>;

  if (result.length === 0)
    return (
      <p className="px-4">
        No result found in <span className="font-semibold">{query}</span>{" "}
        keyword.
      </p>
    );

  return (
    <div className="container px-4">
      <h6>Search Results: {result.length}</h6>

      <div className="flex flex-wrap gap-x-4">
        {result.map((comm, index) => (
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

export default CommunitySearch;
