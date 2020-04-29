import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React from 'react';
import {GoogleSignin} from '@react-native-community/google-signin';

export enum LoginState {
  NOT_LOGGED_IN,
  LOGGED_IN,
  LOADING,
  INIT,
}

export type AuthContextType = {
  state: LoginState;
  user: FirebaseAuthTypes.User | undefined;
  signInGoogle: () => Promise<FirebaseAuthTypes.UserCredential>;
  signOut: () => Promise<void>;
};

export async function signInGoogle(): Promise<
  FirebaseAuthTypes.UserCredential
> {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export async function signOut(): Promise<void> {
  return auth().signOut();
}

const AuthContext = React.createContext<AuthContextType>({
  state: LoginState.INIT,
  user: undefined,
  signInGoogle,
  signOut,
});
export default AuthContext;
