import api from "../../utilities/api";

export const getChatByUserId = async (userId) => {
  try {
    const res = await api.setAuthHeaders().get(`/api/userchat/${userId}`);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const getUserByName = async (userName) => {
  try {
    const res = await api
      .setAuthHeaders()
      .get(`/api/userchat/user?username=${userName}`);

    return res.data.responseData;
  } catch (error) {
    console.log(error);
  }
};

export const getMessagesByUserIds =
  (currentUserId, otherId, index) => async (dispatch) => {
    dispatch({ type: "GET_MESSAGES_BY_USER_IDS_REQUEST" });

    try {
      const res = await api
        .setAuthHeaders()
        .get(
          `/api/userchat/messages/${currentUserId}?otherId=${otherId}&index=${index}`
        );
      dispatch({
        type: "GET_MESSAGES_BY_USER_IDS_SUCCESS",
        payload: res.data.responseData,
      });
    } catch (error) {
      dispatch({ type: "GET_MESSAGES_BY_USER_IDS_FAILED", error: error });
    }
  };

export const deleteMessageById = async (id) => {
  try {
    const res = await api
      .setAuthHeaders()
      .delete(`/api/userchat/messages/message/${id}`);

    return res.data.responseData;
  } catch (error) {
    console.error(error);
  }
};
