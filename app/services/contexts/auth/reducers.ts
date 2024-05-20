import { AuthState } from "./types";
import { AuthActionTypes, PayloadAction } from "./AuthContext";

export interface ReducerHandler {
  INITIALIZED: (
    state: AuthState,
    payload: PayloadAction<AuthState>
  ) => AuthState;
  SIGN_IN: (state: AuthState, payload: PayloadAction<AuthState>) => AuthState;
  SIGN_OUT: (state: AuthState, payload: PayloadAction<AuthState>) => AuthState;
}

const reducerHandlers: ReducerHandler = {
  INITIALIZED: (
    state: AuthState,
    action: PayloadAction<AuthState>
  ): AuthState => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  SIGN_IN: (state: AuthState, action: PayloadAction<AuthState>): AuthState => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      user,
    };
  },
  SIGN_OUT: (state: AuthState, action: PayloadAction<AuthState>): AuthState => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

export function reducer(
  state: AuthState,
  action: PayloadAction<AuthState>
): AuthState {
  const handler = reducerHandlers[action.type];
  if (!handler) {
    throw state;
  }
  return handler(state, action);
}

// ============ACTIONS================ //
export function initialized(payload: AuthState): PayloadAction<AuthState> {
  return {
    type: AuthActionTypes.INITIALIZED,
    payload,
  };
}

export function signIn(payload: AuthState): PayloadAction<AuthState> {
  return {
    type: AuthActionTypes.SIGN_IN,
    payload,
  };
}

export function signOut(payload: AuthState): PayloadAction<AuthState> {
  localStorage.removeItem("ACCESS_TOKEN");

  return {
    type: AuthActionTypes.SIGN_OUT,
    payload: {
      user: null,
    },
  };
}
