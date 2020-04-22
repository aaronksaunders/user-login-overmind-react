import { IConfig, derived, OnInitialize } from "overmind";
import { createHook } from "overmind-react";
import * as actions from "./actions";
import * as effects from "./effects";

declare module "overmind" {
  interface Config extends IConfig<typeof config> {}
}

export type IState = {
  error: any;
  currentUser: any;
  isLoggedIn: boolean;
  initialized : boolean;
};

const state: IState = {
  error: null,
  currentUser: null,
  initialized : false,
  // derived value
  isLoggedIn: derived<IState, boolean>(
    (state: IState) => state.currentUser != null
  ),
};

// Initialization
export const onInitialize: OnInitialize = async (
  { state, effects },
  overmind
) => {
  let user = await effects.initialize();
  state.currentUser = user;
  state.initialized = true;
};

// state config
export const config = {
  onInitialize,
  state,
  actions,
  effects,
  
};

// hook to provide access in components
export const useApp = createHook<typeof config>();
