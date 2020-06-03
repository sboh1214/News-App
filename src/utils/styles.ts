import {StyleSheet} from 'react-native';

export const headerStyles = StyleSheet.create({
  left: {
    flex: 0,
  },
  body: {
    flex: 1,
  },
  right: {
    flex: 0,
  },
});

export const searchStyles = StyleSheet.create({
  listItem: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  header: {
    height: 84,
  },
});

export const searchListStyles = StyleSheet.create({
  loadingBar: {
    width: '94%',
  },
  header: {
    height: 84,
  },
});

export const newsStyles = StyleSheet.create({
  content: {
    flex: 1,
  },
  footerTab: {
    flex: 1,
  },
  footerView: {
    flexDirection: 'row',
  },
  footerSegment: {
    height: 48,
    flex: 1,
  },
});
