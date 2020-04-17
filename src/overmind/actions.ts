import { AsyncAction } from "overmind";

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
