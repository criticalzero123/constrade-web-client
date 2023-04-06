export const userInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_INFO":
      return {
        ...state,
        user: action.payload,
      };

    case "USER_INFO_CLEAR":
      return {};

    default:
      return { ...state };
  }
};
