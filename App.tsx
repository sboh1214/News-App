import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedScreen from 'screens/tabs/FeedScreen';
import SearchScreen from 'screens/tabs/SearchScreen';
import FollowingScreen from 'screens/tabs/FollowingScreen';
import SearchListScreen from 'screens/SearchListScreen';
import React, {useEffect, useState} from 'react';
import AddNewsScreen from 'screens/AddNewsScreen';
import SettingsScreen from 'screens/SettingsScreen';
import {GoogleSignin} from '@react-native-community/google-signin';
import AuthContext, {LoginState, signInGoogle, signOut} from 'utils/auth';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const Tab = createBottomTabNavigator();

function TabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Following" component={FollowingScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function NewsApp() {
  GoogleSignin.configure({
    webClientId:
      '74031474846-hpnonovcn67k9bs6bu8gr2bvglg5847b.apps.googleusercontent.com',
  });

  // Set an initializing state whilst Firebase connects
  const [loginState, setLoginState] = useState<LoginState>(LoginState.INIT);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  // Handle user state changes
  function onAuthStateChanged(newUser: FirebaseAuthTypes.User | null) {
    if (newUser === null) {
      setLoginState(LoginState.NOT_LOGGED_IN);
    } else {
      setUser(newUser);
      if (loginState) setLoginState(LoginState.LOGGED_IN);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <AuthContext.Provider
      value={{state: loginState, user, signInGoogle, signOut}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="News App" component={TabScreen} />
          <Stack.Screen name="Search List" component={SearchListScreen} />
          <Stack.Screen name="Add News" component={AddNewsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
