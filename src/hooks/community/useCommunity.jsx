import {
  createCommunity,
  deleteCommunity,
  editCommunity,
  joinCommunityById,
} from "../../redux/action/communityAction";
const useCommunity = () => {
  const create = (info) => {
    return createCommunity(info);
  };

  const join = (communityId, userId) => {
    return joinCommunityById({ communityId, userId });
  };

  const deleteCommunityById = (id, userId) => {
    return deleteCommunity(id, userId);
  };
  const edit = (info) => {
    return editCommunity(info);
  };

  return { create, join, deleteCommunityById, edit };
};

export default useCommunity;
