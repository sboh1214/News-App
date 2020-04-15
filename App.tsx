import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedScreen from 'screens/FeedScreen';
import SearchScreen from 'screens/SearchScreen';
import FollowingScreen from 'screens/FollowingScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Following" component={FollowingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
