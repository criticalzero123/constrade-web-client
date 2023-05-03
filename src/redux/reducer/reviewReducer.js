export const getOtherReviewsUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_OTHER_USER_REVIEWS_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_OTHER_USER_REVIEWS_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_OTHER_USER_REVIEWS_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    default:
      return { ...state };
  }
};

export const getMyReviewsUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_MY_USER_REVIEWS_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_MY_USER_REVIEWS_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_MY_USER_REVIEWS_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    default:
      return { ...state };
  }
};

export const getNotRatedReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_NOT_RATED_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_NOT_RATED_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_NOT_RATED_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    default:
      return { ...state };
  }
};
