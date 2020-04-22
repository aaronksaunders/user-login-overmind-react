import { AsyncAction, Action } from "overmind";
import * as API from "./firebase-data";

console.log(API.default);

export const doCreateAccount: AsyncAction<any, boolean> = async (
  { state },
  userInfo: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }
) => {
  state.error = null;
  state.currentUser = null;
  let newUserInfo = await API.createAccount(userInfo);
  let user = { ...userInfo, uid: newUserInfo?.user?.uid };
  delete user.password;
  state.currentUser = { ...user };
  return true;
};
/**
 *
 * @param param0
 */
export const doLogout: AsyncAction<void, boolean> = async ({ state }) => {
  state.error = null;
  state.currentUser = null;

  await API.logout();
  return true;
};

/**
 *
 * @param param0
 * @param credentials
 */
export const doLogin: Action<any, any> = async (
  { state, effects },
  credentials: { email: string; password: string }
) => {
  try {
    state.error = null;
    state.currentUser = null;

    let { user } = await effects.login(credentials);

    state.currentUser = {
      email: user?.email,
      username: user?.displayName || user?.email,
      uid: user?.uid,
    };
    return state.currentUser;
  } catch (error) {
    state.currentUser = null;
    state.error = error;
    return error;
  }
};
