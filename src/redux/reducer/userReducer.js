export const userInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_INFO":
      return {
        user: action.payload.user,
        person: action.payload.person,
      };

    case "USER_INFO_CLEAR":
      return {};

    default:
      return { ...state };
  }
};

export const getUserByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_USER_BY_ID_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_USER_BY_ID_SUCCESS":
      return {
        success: true,
        data: action.payload,
        loading: false,
      };

    case "GET_USER_BY_ID_FAILED":
      return {
        error: action.error,
        loading: false,
      };

    case "GET_USER_BY_ID_LEAVE":
      return {};

    default:
      return state;
  }
};
