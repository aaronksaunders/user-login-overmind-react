import { IConfig, derived } from "overmind";
import { createHook } from "overmind-react";
import * as actions from './actions'

declare module "overmind" {
  interface Config extends IConfig<typeof config> {}
}

export type IState = {
  error: any;
  currentUser: any;
  isLoggedIn: boolean;
};

const state: IState = {
  error: null,
  currentUser: null,
  // derived value
  isLoggedIn: derived<IState, boolean>(
    (state: IState) => state.currentUser != null
  ),
};

// state config
export const config = {
    state,
    actions
}

// hook to provide access in components
export const useApp = createHook<typeof config>();