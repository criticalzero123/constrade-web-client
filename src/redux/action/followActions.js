import api from "../../utilities/api";

export const getFollowAndFollowersUser = (userId) => async (dispatch) => {
  try {
    const res = await api.setAuthHeaders().get(`/api/follow/${userId}`);

    dispatch({ type: "GET_FOLLOW_COUNT", payload: res.data.responseData });
  } catch (err) {
    console.error(err);
  }
};

export const followUser = async (otherUserId, currentUserId) => {
  try {
    const res = await api.setAuthHeaders().post(`/api/follow`, {
      followByUserId: otherUserId,
      followedByUserId: currentUserId,
    });

    return res.data.responseData;
  } catch (err) {
    console.error(err);
  }
};

export const showFollowUser = async (currentUserId) => {
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/follow/followed?userId=${currentUserId}`);

    return res.data.responseData;
  } catch (err) {
    console.error(err);
  }
};

export const showFollowerUser = async (currentUserId) => {
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/follow/follower?userId=${currentUserId}`);

    return res.data.responseData;
  } catch (err) {
    console.error(err);
  }
};

export const isFollowUser = async (otherUserId, currentUserId) => {
  try {
    const res = await api
      .setAuthHeaders()
      .get(
        `/api/follow?currentUserId=${currentUserId}&otherUserId=${otherUserId}`
      );

    return res.data.responseData;
  } catch (err) {
    console.error(err);
  }
};
