import { createContext, useEffect, useReducer } from "react";
import { User as FirebaseUser } from "@firebase/auth";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

// type definitions
interface IAuthContext {
  user: FirebaseUser | null;
  authIsReady: boolean;
  setUser: (user: FirebaseUser | null) => void;
}
export interface IAuthState {
  user: FirebaseUser | null;
  authIsReady: boolean;
}
export interface AuthAction {
  type: AuthActions;
  payload: FirebaseUser | null;
}
export enum AuthActions {
  SET_USER,
  SET_AUTH_READY,
}

// auth reducer
export const authReducer = (state: IAuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthActions.SET_USER:
      return { ...state, user: action.payload };
    case AuthActions.SET_AUTH_READY:
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

// context and context provider
export const AuthContext = createContext<null | IAuthContext>(null);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, authDispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  const setUser = (user: FirebaseUser | null) => {
    authDispatch({ type: AuthActions.SET_USER, payload: user });
  };

  // this is to check and see if a user is currently logged in when application loads
  // once we've checked, authIsReady will be set to true and we will use that to tell the app to render
  // if no user is logged in, we will render login and registration buttons. If a user IS logged in, we will render logout
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      authDispatch({
        type: AuthActions.SET_AUTH_READY,
        payload: user,
      });

      unsub();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
