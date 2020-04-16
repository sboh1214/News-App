import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Realm from 'realm';
import FeedScreen from 'screens/FeedScreen';
import SearchScreen from 'screens/SearchScreen';
import FollowingScreen from 'screens/FollowingScreen';
import SearchListScreen from 'screens/SearchListScreen';
import React, {useState, useEffect} from 'react';

const FeedStack = createStackNavigator();
function FeedStackScreen() {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen name="Feed" component={FeedScreen} />
    </FeedStack.Navigator>
  );
}

const SearchStack = createStackNavigator();
function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen name="Search List" component={SearchListScreen} />
    </SearchStack.Navigator>
  );
}

const FollowingStack = createStackNavigator();
function FollowingStackScreen() {
  return (
    <FollowingStack.Navigator>
      <FollowingStack.Screen name="Following" component={FollowingScreen} />
    </FollowingStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [realm, setRealm] = useState<Object | null>(null);

  useEffect(() => {
    Realm.open({
      schema: [{name: 'Dog', properties: {name: 'string'}}],
    }).then((result: any) => {
      setRealm(result);
    });
    return () => {
      realm?.close();
    };
  }, [realm]);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Feed" component={FeedStackScreen} />
        <Tab.Screen name="Search" component={SearchStackScreen} />
        <Tab.Screen name="Following" component={FollowingStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
