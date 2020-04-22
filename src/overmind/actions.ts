import { AsyncAction } from "overmind";

export const doCreateAccount: AsyncAction<any, boolean> = async (
  { state },
  userInfo: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }
) => {
  return new Promise((resolve, reject) => {
    state.error = null;
    state.currentUser = null;

    // fake error message to show errors
    if ( userInfo.email === 'a@mail.com') {
      state.error = {message : 'user already exists'};
      reject(state.error);
      return;
    }

    // fake user
    let user = { ...userInfo };
    delete user.password;
    state.currentUser = { ...user };
    resolve(true);
  });
};
/**
 *
 * @param param0
 */
export const doLogout: AsyncAction<void, boolean> = async ({ state }) => {
  return new Promise((resolve) => {
    state.error = null;
    state.currentUser = null;

    resolve(true);
  });
};

/**
 *
 * @param param0
 * @param credentials
 */
export const doLogin: AsyncAction<any, any> = async (
  { state },
  credentials: { email: string; password: string }
) => {
  return new Promise((resolve, reject) => {
    state.error = null;
    state.currentUser = null;

    if (credentials.password === "password123") {
      state.currentUser = {
        email: credentials.email,
        username: credentials.email,
        uid: "121222121",
      };
      resolve(state.currentUser);
    } else {
      state.currentUser = null;
      state.error = { message: "No User Found" };
      reject(state.error);
    }
  });
};
