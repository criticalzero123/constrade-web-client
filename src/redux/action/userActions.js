import api from "../../utilities/api";

export const getUserInfo = (user) => (dispatch) => {
  localStorage.setItem("currentUser", JSON.stringify(user));

  dispatch({ type: "USER_INFO", payload: user });
};

export const getHasRequest = async (userId) => {
  try {
    const res = await api.setAuthHeaders().get(`api/verification/${userId}`);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const submitIdRequest = async (info) => {
  try {
    const res = await api
      .setAuthHeaders()
      .post("api/verification/submit", info);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};

export const updatePersonInfo = async (personInfo) => {
  try {
    const result = await api
      .setAuthHeaders()
      .put(`api/users/person`, personInfo);

    return result.data.responseData;
  } catch (err) {
    console.log(err);
  }
};

export const getUserById = (userId) => async (dispatch) => {
  dispatch({ type: "GET_USER_BY_ID_REQUEST" });

  try {
    const res = await api.setAuthHeaders().get(`/api/users/${userId}`);

    dispatch({
      type: "GET_USER_BY_ID_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (err) {
    dispatch({ type: "GET_USER_BY_ID_FAILED", error: err });
  }
};
