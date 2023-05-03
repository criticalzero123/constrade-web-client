export const followCountReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_FOLLOW_COUNT":
      return {
        data: action.payload,
      };

    default:
      return { ...state };
  }
};
