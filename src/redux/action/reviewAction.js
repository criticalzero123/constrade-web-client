import api from "../../utilities/api";

export const getMyAverageRate = async (userId) => {
  try {
    const res = await api.setAuthHeaders().get(`/api/review/${userId}`);

    return res.data.responseData;
  } catch (err) {
    console.error(err);
  }
};

export const getOtherReviewsUser = async (otherUserId, userId) => {
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/review/${otherUserId}/other?userId=${userId}`);
    return res.data.responseData;
  } catch (err) {
    console.log(err);
  }
};

export const getMyReviewsUser = (otherUserId, userId) => async (dispatch) => {
  dispatch({ type: "GET_MY_USER_REVIEWS_REQUEST" });

  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/review/${otherUserId}/my?userId=${userId}`);
    dispatch({
      type: "GET_MY_USER_REVIEWS_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (err) {
    dispatch({ type: "GET_MY_USER_REVIEWS_FAILED", error: err });
  }
};

export const getNotRated = (userId, visitorId) => async (dispatch) => {
  dispatch({ type: "GET_NOT_RATED_REQUEST" });

  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/review/${userId}/available?visitorId=${visitorId}`);
    dispatch({
      type: "GET_NOT_RATED_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (err) {
    dispatch({ type: "GET_NOT_RATED_FAILED", error: err });
  }
};

export const addReview = async (reviewerId, info) => {
  try {
    const res = await api
      .setAuthHeaders()
      .post(`/api/review?reviewerId=${reviewerId}`, info);

    return res.data.responseData;
  } catch (err) {
    console.log("Something Went Wrong.");
  }
};
