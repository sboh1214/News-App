import {AppRegistry, LogBox} from 'react-native';
import {enableScreens} from 'react-native-screens';
import NewsApp from './src/App';

enableScreens();
LogBox.ignoreAllLogs();
AppRegistry.registerComponent('NewsApp', () => NewsApp);
