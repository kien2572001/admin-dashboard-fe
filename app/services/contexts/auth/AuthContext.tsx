"use client";

import { createContext, Dispatch, FC, useEffect, useReducer } from "react";
import { AuthState } from "./types";
import { reducer } from "./reducers";
import UserServices from "../../api/user-api";
import { jwtDecode } from "jwt-decode";

export enum AuthActionTypes {
  INITIALIZED = "INITIALIZED",
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
}

export interface PayloadAction<T> {
  type: AuthActionTypes;
  payload: T;
}

export interface AuthContextType extends AuthState {
  dispatch: Dispatch<PayloadAction<AuthState>>;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  dispatch: () => null,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem("ACCESS_TOKEN");
      if (!accessToken) {
        dispatch({
          type: AuthActionTypes.INITIALIZED,
          payload: { isAuthenticated: false, user: null },
        });
        return;
      }

      try {
        const decodedToken: { exp: number } = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          dispatch({
            type: AuthActionTypes.INITIALIZED,
            payload: { isAuthenticated: false, user: null },
          });
          localStorage.removeItem("ACCESS_TOKEN");
          return;
        }

        const user = await UserServices.fetchMyProfile();
        dispatch({
          type: AuthActionTypes.INITIALIZED,
          payload: { isAuthenticated: true, user },
        });
      } catch (error) {
        dispatch({
          type: AuthActionTypes.INITIALIZED,
          payload: { isAuthenticated: false, user: null },
        });
      }
    })();
  }, []);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
