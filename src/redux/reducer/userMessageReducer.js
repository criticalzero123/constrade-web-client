export const getMessagesByUserIdsReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_MESSAGES_BY_USER_IDS_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_MESSAGES_BY_USER_IDS_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_MESSAGES_BY_USER_IDS_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "GET_MESSAGES_BY_USER_IDS_LEAVE":
      return {};

    default:
      return { ...state };
  }
};
