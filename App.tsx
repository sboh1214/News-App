import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedScreen from 'screens/tabs/FeedScreen';
import SearchScreen from 'screens/tabs/SearchScreen';
import FollowingScreen from 'screens/tabs/FollowingScreen';
import SearchListScreen from 'screens/SearchListScreen';
import React from 'react';
import AddNewsScreen from 'screens/AddNewsScreen';
import SettingsScreen from 'screens/tabs/SettingsScreen';
import {Root} from 'native-base';
import NewsScreen from 'screens/NewsScreen';
import {StackParamList} from 'utils/params';

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

const Stack = createStackNavigator<StackParamList>();

export default function NewsApp() {
  return (
    <Root>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="TabScreen" component={TabScreen} />
          <Stack.Screen name="SearchListScreen" component={SearchListScreen} />
          <Stack.Screen name="AddNewsScreen" component={AddNewsScreen} />
          <Stack.Screen name="NewsScreen" component={NewsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  );
}
