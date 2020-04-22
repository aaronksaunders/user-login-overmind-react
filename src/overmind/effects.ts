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

export const API = { ...firebaseAPI } 
