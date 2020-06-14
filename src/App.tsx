import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedScreen from 'screens/tabs/FeedScreen';
import SearchScreen from 'screens/tabs/SearchScreen';
import FollowingScreen from 'screens/tabs/FollowingScreen';
import SearchListScreen from 'screens/SearchListScreen';
import React, {useEffect, useState} from 'react';
import AddNewsScreen from 'screens/AddNewsScreen';
import SettingsScreen from 'screens/tabs/SettingsScreen';
import NewsScreen from 'screens/NewsScreen';
import {StackParamList} from 'utils/params';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {GoogleSignin} from '@react-native-community/google-signin';
import {Appearance} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {DarkTheme, LightTheme} from 'utils/theme';

type TabBarIcon = {
  focused: boolean;
  color: string;
  size: number;
};

const Tab = createBottomTabNavigator();

function TabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}: TabBarIcon) => {
          let iconName;
          if (route.name === 'Feed') {
            iconName = 'dashboard';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Following') {
            iconName = 'format-list-bulleted';
          } else {
            iconName = 'settings';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Following" component={FollowingScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator<StackParamList>();

export default function NewsApp() {
  GoogleSignin.configure({
    webClientId:
      '74031474846-hpnonovcn67k9bs6bu8gr2bvglg5847b.apps.googleusercontent.com',
  });

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  useEffect(() => {
    setIsDarkTheme(Appearance.getColorScheme() === 'dark');
    Appearance.addChangeListener((theme) => {
      setIsDarkTheme(theme.colorScheme === 'dark');
    });
  }, []);

  return (
    <NavigationContainer theme={isDarkTheme ? DarkTheme : LightTheme}>
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
  );
}
