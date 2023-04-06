export const getUserInfo = (user) => (dispatch) => {
  localStorage.setItem("currentUser", JSON.stringify(user));

  dispatch({ type: "USER_INFO", payload: user });
};
