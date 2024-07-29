const initialState = {
  user: null,
};

export const SET_USER = "SET_USER";

export default function userReducer(state = initialState, action) {
  // const { payload } = action;
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    default:
      return state;
  }
}

export function setUser(user) {
  const userR = userReducer(initialState, {
    type: "SET_USER",
    payload: user,
  });
  console.log(userR);
  return userR;
  // console.log(initialState.user);
  // return {
  //   type: "SET_USER",
  //   payload: user,
  // };
}
