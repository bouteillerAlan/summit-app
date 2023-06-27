import { useRouter, useSegments } from 'expo-router';
import React, { type ReactElement } from 'react';
import { type AuthCtx } from '../types/interfaces';
import Storage from './storage';
import Api from './api';

const AuthContext: React.Context<AuthCtx | null> = React.createContext<AuthCtx | null>(null);

/**
 * authentication context
 * @returns {null} react context
 */
export function useAuth(): AuthCtx | null {
  return React.useContext<AuthCtx | null>(AuthContext);
}

/**
 * validate the connected user and take action
 * @returns {void} redirect the user
 */
function validateUser(): void {
  const router = useRouter();
  const segments: string[] = useSegments();

  React.useEffect((): void => {
    // if the user is not in the login page we need to check this right
    if (segments.length > 0 && segments[0] !== '/') {
      // validate the user via the user/me endpoint
      Api.getInstance().getUser()
        .then((): void => {}) // the token is valid so do nothing :) the user have the right to be there
        .catch((): void => { // the token is not valid redirect the user to the login page
          // delete the token
          Storage.getInstance().remove('token')
            .then((): void => {})
            .catch((): void => {})
            .finally(() => {
              // in all case we want to redirect the user
              router.replace('/');
            });
        });
    }
  }, [segments]);
}

/**
 * Auth provider component
 * @param {{ children: ReactElement }} props transmitted props, must have a children
 * @param {ReactElement} props.children react component you want to wrap into
 * @returns {ReactElement} the children wrapped into the provider
 */
export function AuthProvider(props: { children: ReactElement }): ReactElement {
  const router = useRouter();

  /**
   * execute the login action : save the token via the storage service and redirect the user
   * @param {string} token the jwt token you want to store
   * @param {() => void} callbackError function executed if the storage failed
   */
  function signIn(token: string, callbackError: () => void): void {
    Storage.getInstance().save('token', token)
      .then((): void => { router.replace('/(connected)/dashboard'); })
      .catch((): void => { callbackError(); });
  }

  /**
   * execute the logout action : remove the token via the storage service and redirect the user
   * @param {() => void} callbackError function executed if the suppression failed
   */
  function signOut(callbackError: () => void): void {
    Storage.getInstance().remove('token')
      .then((): void => { router.replace('/'); })
      .catch((): void => { callbackError(); });
  }

  validateUser();

  return (
    <AuthContext.Provider
      value={{
        signIn: (token: string, callbackError: () => void): void => { signIn(token, callbackError); },
        signOut: (callbackError: () => void): void => { signOut(callbackError); }
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
