import {
  AsyncAction,
  Action,
  pipe,
  mutate,
  catchError,
  Operator,
} from "overmind";

type UserInfo = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  uid?:string
}

export const createAccountAndUserRecord: Operator<any, any> = pipe(
  mutate(async ({ state, effects }, userInfo: any) => {
    state.error = null;
    state.currentUser = null;
    let { email, password } = userInfo;
    let newUserInfo = await effects.createAccount({ email, password });
    state.currentUser = { ...newUserInfo.user, uid: newUserInfo?.user?.uid };
  }),
  mutate(
    async ({ state, effects }, userInfo: any) => {
      let newUserInfo = await effects.createUserRecord(userInfo);
      state.currentUser = { ...newUserInfo?.data() };
    }
  ),
  catchError(({ state }, error: Error): Operator<Error, never> => {
    state.error = error;
    throw new Error(error.message);
  })
);

export const doCreateAccount: AsyncAction<any, boolean> = async (
  { state, effects },
  userInfo: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }
) => {
  state.error = null;
  state.currentUser = null;
  let { email, password } = userInfo;
  let newUserInfo = await effects.createAccount({ email, password });
  state.currentUser = { ...newUserInfo.user, uid: newUserInfo?.user?.uid };
  return true;
};

export const doAddUser: AsyncAction<any, boolean> = async (
  { state, effects },
  userInfo: {
    email: string;
    firstName: string;
    lastName: string;
    uid: string;
  }
) => {
  state.error = null;
  await effects.createUserRecord(userInfo);
  state.currentUser = { ...state.currentUser.user, ...userInfo };
  return true;
};
/**
 *
 * @param param0
 */
export const doLogout: AsyncAction<void, boolean> = async ({
  state,
  effects,
}) => {
  state.error = null;
  state.currentUser = null;

  await effects.logout();
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
