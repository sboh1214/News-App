import {AppRegistry, unstable_enableLogBox} from 'react-native';
import NewsApp from './App';
import {name as appName} from './app.json';

unstable_enableLogBox();
AppRegistry.registerComponent(appName, () => NewsApp);
