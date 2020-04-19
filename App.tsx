import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedScreen from 'screens/FeedScreen';
import SearchScreen from 'screens/SearchScreen';
import FollowingScreen from 'screens/FollowingScreen';
import SearchListScreen from 'screens/SearchListScreen';
import React from 'react';

const Tab = createBottomTabNavigator();

function TabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Following" component={FollowingScreen} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function NewsApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="News App" component={TabScreen} />
        <Stack.Screen name="Search List" component={SearchListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
