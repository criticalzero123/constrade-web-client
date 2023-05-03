import api from "../../utilities/api";

export const getProductMessages =
  (userId, userId2, productId, index) => async (dispatch) => {
    dispatch({ type: "GET_PRODUCT_MESSAGES_REQUEST" });

    try {
      const res = await api
        .setAuthHeaders()
        .get(
          `/api/productchat/messages/${productId}?userId=${userId}&userId2=${userId2}&index=${index}`
        );

      dispatch({
        type: "GET_PRODUCT_MESSAGES_SUCCESS",
        payload: res.data.responseData,
      });
    } catch (error) {
      dispatch({ type: "GET_PRODUCT_MESSAGES_FAILED", error: error });
    }
  };

export const getProductChatByUserId = (userId) => async (dispatch) => {
  dispatch({ type: "DELETE_PRODUCT_MESSAGE_REQUEST" });

  try {
    const res = await api.setAuthHeaders().get(`/api/productchat/${userId}`);

    dispatch({
      type: "GET_PRODUCT_CHAT_BY_USER_ID_SUCCESS",
      payload: res.data.responseData,
    });
  } catch (error) {
    dispatch({ type: "GET_PRODUCT_CHAT_BY_USER_ID_FAILED", error: error });
  }
};

export const deleteProductMessage = async (id) => {
  try {
    const res = await api
      .setAuthHeaders()
      .delete(`/api/productchat/messages/message/${id}`);

    return res.data.responseData;
  } catch (error) {
    alert("Something Went Wrong");
  }
};
