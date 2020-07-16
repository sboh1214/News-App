import React, {useState, useEffect} from 'react';
import * as NB from 'native-base';
import {
  GoogleSigninButton,
  GoogleSignin,
} from '@react-native-community/google-signin';
import {StyleSheet, View, Text} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {onUserAuthChanged} from 'utils/firebase';

type AccountBoxProps = {
  style: {
    textColor: string;
  };
};

export default function AccountBox({style}: AccountBoxProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  const styles = StyleSheet.create({
    text: {
      color: style.textColor,
    },
    google: {
      width: 192,
      height: 48,
    },
  });

  // Handle user state changes
  async function signInGoogle(): Promise<FirebaseAuthTypes.UserCredential> {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }

  useEffect(() => {
    const onChanged = (newUser: FirebaseAuthTypes.User | null) => {
      setUser(newUser);
      if (isLoading) setIsLoading(false);
    };
    onUserAuthChanged(onChanged).then((subscriber) => {
      return subscriber;
    });
  }, [isLoading]);

  if (isLoading) {
    return <Text>Loading</Text>;
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
    <View>
      <NB.ListItem>
        <Text style={styles.text}>Welcome {user?.email}</Text>
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
        <Text style={styles.text}>Sign Out</Text>
      </NB.ListItem>
    </View>
  );
}
