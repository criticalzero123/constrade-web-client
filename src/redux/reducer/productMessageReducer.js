export const getProductMessagesReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_PRODUCT_MESSAGES_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_PRODUCT_MESSAGES_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_PRODUCT_MESSAGES_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "GET_PRODUCT_MESSAGES_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const getProductChatByUserIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_PRODUCT_CHAT_BY_USER_ID_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_PRODUCT_CHAT_BY_USER_ID_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_PRODUCT_CHAT_BY_USER_ID_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "GET_PRODUCT_CHAT_BY_USER_ID_LEAVE":
      return {};

    default:
      return { ...state };
  }
};
