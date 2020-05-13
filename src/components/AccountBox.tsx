import React, {useState, useEffect} from 'react';
import * as NB from 'native-base';
import {
  GoogleSigninButton,
  GoogleSignin,
} from '@react-native-community/google-signin';
import {StyleSheet} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const styles = StyleSheet.create({
  google: {
    width: 192,
    height: 48,
  },
});

export default function AccountBox() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  // Handle user state changes

  async function signInGoogle(): Promise<FirebaseAuthTypes.UserCredential> {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }

  useEffect(() => {
    const onAuthStateChanged = (newUser: FirebaseAuthTypes.User | null) => {
      setUser(newUser);
      if (isLoading) setIsLoading(false);
    };
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (isLoading) {
    return <NB.Text>Loading</NB.Text>;
  }
  if (!user) {
    return (
      <GoogleSigninButton
        style={styles.google}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() =>
          signInGoogle()
            .then(() => {
              NB.Toast.show({
                text: 'Successfully signed in with Google',
                type: 'success',
              });
            })
            .catch((googleSignInErr) => {
              NB.Toast.show({
                text: googleSignInErr,
                type: 'danger',
              });
            })
        }
        disabled={false}
      />
    );
  }
  return (
    <NB.View>
      <NB.ListItem>
        <NB.Thumbnail
          large
          source={{
            uri:
              'https://facebook.github.io/react-native/docs/assets/favicon.png',
          }}
        />
        <NB.Text>Welcome {user?.email}</NB.Text>
      </NB.ListItem>
      <NB.ListItem
        onPress={() => {
          auth()
            .signOut()
            .then(() => {
              NB.Toast.show({
                text: 'Successfully signed out.',
                type: 'success',
              });
            })
            .catch((signOutErr) => {
              NB.Toast.show({
                text: signOutErr,
                type: 'danger',
              });
            });
        }}>
        <NB.Text>Sign Out</NB.Text>
      </NB.ListItem>
    </NB.View>
  );
}
