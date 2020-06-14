import {AppRegistry} from 'react-native';
import {enableScreens} from 'react-native-screens';
import NewsApp from './src/App';

enableScreens();
AppRegistry.registerComponent('NewsApp', () => NewsApp);
