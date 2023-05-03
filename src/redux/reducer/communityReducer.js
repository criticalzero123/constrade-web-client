export const getMyCommunityReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_MY_COMMUNITY_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_MY_COMMUNITY_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_MY_COMMUNITY_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "GET_MY_COMMUNITY_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const getCommunityByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_COMMUNITY_BY_ID_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_COMMUNITY_BY_ID_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_COMMUNITY_BY_ID_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "GET_COMMUNITY_BY_ID_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const getAllCommunityReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ALL_COMMUNITY_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_ALL_COMMUNITY_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_ALL_COMMUNITY_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "GET_ALL_COMMUNITY_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const getCommentPostReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_COMMENT_POST_BY_ID_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_COMMENT_POST_BY_ID_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_COMMENT_POST_BY_ID_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "GET_COMMENT_POST_BY_ID_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const getCommunityMembersReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_COMMUNITY_MEMBERS_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_COMMUNITY_MEMBERS_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_COMMUNITY_MEMBERS_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "GET_COMMUNITY_MEMBERS_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const deleteCommunityMemberByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_COMMUNITY_MEMBER_BY_ID_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "DELETE_COMMUNITY_MEMBER_BY_ID_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "DELETE_COMMUNITY_MEMBER_BY_ID_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "DELETE_COMMUNITY_MEMBER_BY_ID_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const getAllMyCommunityJoinedReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_COMMUNITY_JOINED_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_COMMUNITY_JOINED_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_COMMUNITY_JOINED_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "GET_COMMUNITY_JOINED_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const getPopularCommunityReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_SUGGESTED_COMMUNITY_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_SUGGESTED_COMMUNITY_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_SUGGESTED_COMMUNITY_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    case "GET_SUGGESTED_COMMUNITY_LEAVE":
      return {};

    default:
      return { ...state };
  }
};

export const communityData = (state = {}, action) => {
  switch (action.type) {
    case "COMMUNITY_DATA":
      return {
        id: action.payload.id,
        memberInfo: action.payload.memberInfo,
      };

    default:
      return { ...state };
  }
};
