import DeviceInfo from 'react-native-device-info';

export default function getVersionAndBuild() {
  return {version: DeviceInfo.getVersion(), build: DeviceInfo.getBuildNumber()};
}
