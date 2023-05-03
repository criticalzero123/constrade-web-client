import api from "../../utilities/api";
export const createCommunity = async (info) => {
  try {
    const res = await api.setAuthHeaders().post("/api/community/create", info);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};

export const getMyCommunity = (userId) => async (dispatch) => {
  dispatch({ type: "GET_MY_COMMUNITY_REQUEST" });

  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/community/created/${userId}`);
    dispatch({
      type: "GET_MY_COMMUNITY_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_MY_COMMUNITY_FAILED", error: error });
  }
};

export const getCommunityById = (id) => async (dispatch) => {
  dispatch({ type: "GET_COMMUNITY_BY_ID_REQUEST" });

  try {
    const res = await api.setAuthHeaders().get(`/api/community/${id}`);
    dispatch({
      type: "GET_COMMUNITY_BY_ID_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_COMMUNITY_BY_ID_FAILED", error: error });
  }
};

export const editCommunity = async (info) => {
  try {
    const res = await api.setAuthHeaders().put("/api/community", info);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCommunity = async (id, userId) => {
  try {
    const res = await api
      .setAuthHeaders()
      .delete(`/api/community/${id}?userId=${userId}`);
    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const reportCommunity = async (info) => {
  try {
    const res = await api.setAuthHeaders().post(`/api/community/report`, info);
    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCommunity = () => async (dispatch) => {
  dispatch({ type: "GET_ALL_COMMUNITY_REQUEST" });

  try {
    const res = await api.setAuthHeaders().get("/api/community");
    dispatch({
      type: "GET_ALL_COMMUNITY_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_ALL_COMMUNITY_FAILED", error: error });
  }
};

export const joinCommunityById = async (info) => {
  try {
    const res = await api.setAuthHeaders().post("/api/community/join", info);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};

export const postCommunity = async (communityId, info) => {
  try {
    const res = await api
      .setAuthHeaders()
      .post(`/api/community/${communityId}/post`, info);

    return parseInt(res.data.responseData);
  } catch (error) {
    console.log(error);
    alert("Something went wrong in server.");
  }
};

export const updatePost = async (communityId, info) => {
  try {
    const res = await api
      .setAuthHeaders()
      .put(`/api/community/${communityId}/post`, info);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
    alert("Something went wrong in server.");
  }
};

export const getPostByCommunityId = async (communityId, userId) => {
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/community/${communityId}/post?userId=${userId}`);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (communityId, postId, userId) => {
  try {
    const res = await api
      .setAuthHeaders()
      .put(
        `/api/community/${communityId}/post/${postId}/like?userId=${userId}`
      );

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const deletePostInCommunity = async (communityId, postId) => {
  try {
    const res = await api
      .setAuthHeaders()
      .delete(`/api/community/${communityId}/post/${postId}`);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = async (communityId, info) => {
  try {
    const res = await api
      .setAuthHeaders()
      .post(
        `/api/community/${communityId}/post/${info.communityPostId}/comment`,
        info
      );

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const editCommentPost = async (communityId, info) => {
  try {
    const res = await api
      .setAuthHeaders()
      .put(
        `/api/community/${communityId}/post/${info.communityPostId}/comment`,
        info
      );

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const getCommentPost = (communityId, postId) => async (dispatch) => {
  dispatch({ type: "GET_COMMENT_POST_BY_ID_REQUEST" });

  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/community/${communityId}/post/${postId}/comment`);

    dispatch({
      type: "GET_COMMENT_POST_BY_ID_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_COMMENT_POST_BY_ID_FAILED", error: error });
  }
};

export const deleteCommentPost = async (communityId, postId, commentId) => {
  try {
    const res = await api
      .setAuthHeaders()
      .delete(
        `/api/community/${communityId}/post/${postId}/comment/${commentId}`
      );

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const getCommunityMembers = async (communityId) => {
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/community/${communityId}/members`);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const removeCommunityMemberById = async (communityId, memberId) => {
  try {
    const res = await api
      .setAuthHeaders()
      .delete(`/api/community/${communityId}/members/${memberId}`);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const getAllMyCommunityJoined = (userId) => async (dispatch) => {
  dispatch({ type: "GET_COMMUNITY_JOINED_REQUEST" });

  try {
    const res = await api.setAuthHeaders().get(`/api/community/${userId}/my`);

    dispatch({
      type: "GET_COMMUNITY_JOINED_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_COMMUNITY_JOINED_FAILED", error: error });
  }
};

export const getPopularCommunity = (userId) => async (dispatch) => {
  dispatch({ type: "GET_SUGGESTED_COMMUNITY_REQUEST" });

  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/community/popular?uid=${userId}`);

    dispatch({
      type: "GET_SUGGESTED_COMMUNITY_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_SUGGESTED_COMMUNITY_FAILED", error: error });
  }
};

export const getMemberRequests = async (id) => {
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/community/${id}/members/requests`);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};

export const acceptMemberRequest = async (id, reqId) => {
  try {
    const res = await api
      .setAuthHeaders()
      .put(`/api/community/${id}/members/accept/${reqId}`);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};

export const rejectMemberRequest = async (id, reqId) => {
  try {
    const res = await api
      .setAuthHeaders()
      .put(`/api/community/${id}/members/reject/${reqId}`);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};

export const communityDataInfo = (id, memberInfo) => async (dispatch) => {
  dispatch({ type: "COMMUNITY_DATA", payload: { id, memberInfo } });
};

export const searchCommunity = async (text, userId) => {
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/community/search?text=${text}&userId=${userId}`);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};
