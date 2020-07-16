import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedScreen from 'screens/tabs/FeedScreen';
import SearchScreen from 'screens/tabs/SearchScreen';
import FollowingScreen from 'screens/tabs/FollowingScreen';
import SearchListScreen from 'screens/SearchListScreen';
import React, {useContext} from 'react';
import AddNewsScreen from 'screens/AddNewsScreen';
import SettingsScreen from 'screens/tabs/SettingsScreen';
import NewsScreen from 'screens/NewsScreen';
import {StackParamList, SCREEN} from 'utils/navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {GoogleSignin} from '@react-native-community/google-signin';
import {createStackNavigator} from '@react-navigation/stack';
import {ThemeContextProvider, ThemeContext} from 'utils/theme';

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
      <Tab.Screen name={SCREEN.Feed} component={FeedScreen} />
      <Tab.Screen name={SCREEN.Search} component={SearchScreen} />
      <Tab.Screen name={SCREEN.Following} component={FollowingScreen} />
      <Tab.Screen name={SCREEN.Settings} component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator<StackParamList>();

function Navigator() {
  const {theme} = useContext(ThemeContext);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen name={SCREEN.Tab} component={TabScreen} />
        <Stack.Screen name={SCREEN.SearchList} component={SearchListScreen} />
        <Stack.Screen name={SCREEN.AddNews} component={AddNewsScreen} />
        <Stack.Screen name={SCREEN.News} component={NewsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function NewsApp() {
  GoogleSignin.configure({
    webClientId:
      '74031474846-hpnonovcn67k9bs6bu8gr2bvglg5847b.apps.googleusercontent.com',
  });

  return (
    <ThemeContextProvider>
      <Navigator />
    </ThemeContextProvider>
  );
}
