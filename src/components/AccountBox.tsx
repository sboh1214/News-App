import React from 'react';
import * as NB from 'native-base';
import {GoogleSigninButton} from '@react-native-community/google-signin';
import {StyleSheet} from 'react-native';
import AuthContext, {AuthContextType, LoginState} from 'utils/auth';

const styles = StyleSheet.create({
  google: {
    width: 192,
    height: 48,
  },
});

export default function AccountBox() {
  return (
    <AuthContext.Consumer>
      {(value: AuthContextType) => {
        if (value.state === LoginState.LOADING) {
          return <NB.Text>Loading</NB.Text>;
        }
        if (value.state === LoginState.NOT_LOGGED_IN) {
          return (
            <GoogleSigninButton
              style={styles.google}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={() =>
                value
                  .signInGoogle()
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
              <NB.Text>Welcome {value.user?.email}</NB.Text>
            </NB.ListItem>
            <NB.ListItem
              onPress={() => {
                value
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
      }}
    </AuthContext.Consumer>
  );
}
