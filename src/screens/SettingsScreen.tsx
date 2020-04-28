import React, {useState, useEffect} from 'react';
import * as NB from 'native-base';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';

async function onGoogleButtonPress() {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

function AccountBox() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return (
      <NB.View>
        <NB.Text>Loading</NB.Text>
      </NB.View>
    );
  }

  if (!user) {
    return (
      <NB.View>
        <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log('Signed in with Google!'),
            )
          }
          disabled={false}
        />
      </NB.View>
    );
  }

  return (
    <NB.View>
      <NB.Text>Welcome {user.email}</NB.Text>
    </NB.View>
  );
}

export default function SettingsScreen() {
  return (
    <NB.Container>
      <NB.Header>
        <NB.Body>
          <NB.Title>Account & Settings</NB.Title>
        </NB.Body>
      </NB.Header>
      <NB.Content>
        <AccountBox />
      </NB.Content>
    </NB.Container>
  );
}
