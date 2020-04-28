import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedScreen from 'screens/FeedScreen';
import SearchScreen from 'screens/SearchScreen';
import FollowingScreen from 'screens/FollowingScreen';
import SearchListScreen from 'screens/SearchListScreen';
import React from 'react';
import AddNewsScreen from 'screens/AddNewsScreen';
import SettingsScreen from 'screens/SettingsScreen';
import {GoogleSignin} from '@react-native-community/google-signin';

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
  return (
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
  );
}
