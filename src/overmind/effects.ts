import * as firebaseAPI from "./firebase-data";

export const initialize = () => {
  return firebaseAPI.authInit();
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await firebaseAPI.login(email, password);
};

export const logout = async () => {
  return await firebaseAPI.logout();
};
export const createAccount = async (userInfo: {
  email: string;
  password: string;
}) => {
  return await firebaseAPI.createAccount(userInfo);
};
export const createUserRecord = async (userInfo: {
  email: string;
  firstName: string;
  lastName: string;
  uid: string;
}) => {
  return await firebaseAPI.createUserRecord(userInfo);
};

export const API = { ...firebaseAPI };
