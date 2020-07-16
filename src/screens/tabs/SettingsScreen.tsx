import React, {useContext, useLayoutEffect} from 'react';
import * as NB from 'native-base';
import AccountBox from 'components/AccountBox';
import {Linking, StyleSheet, ScrollView, Text, Button} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import {
  useAppTheme,
  useHeaderStyles,
  useContentStyles,
  ThemeContext,
  useIsDark,
} from 'utils/theme';
import getVersionAndBuild from 'utils/version';
import {useNavigation} from '@react-navigation/native';
import {SCREEN} from 'utils/navigation';
import withRoot from 'components/withRoot';

const SettingsScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const headerStyles = useHeaderStyles();
  const isDark = useIsDark();
  const setHeaderOptions = () => {
    navigation?.dangerouslyGetParent()?.setOptions({
      headerTitle: () => (
        <Text style={headerStyles.title}>{SCREEN.Settings}</Text>
      ),
      headerRight: () => {},
    });
  };
  useLayoutEffect(() => {
    navigation.addListener('focus', setHeaderOptions);
  }, [navigation, isDark]);

  const theme = useContext(ThemeContext);

  const contentStyles = useContentStyles();
  const appTheme = useAppTheme();

  const {version, build} = getVersionAndBuild();

  const styles = StyleSheet.create({
    segment: {height: 48, flex: 1},
  });

  return (
    <ScrollView style={contentStyles.content}>
      <NB.ListItem itemDivider style={{backgroundColor: appTheme.card}}>
        <Text style={{color: appTheme.text}}>Account</Text>
      </NB.ListItem>
      <AccountBox style={{textColor: appTheme.text}} />
      <NB.ListItem itemDivider style={{backgroundColor: appTheme.card}}>
        <Text style={{color: appTheme.text}}>Appearance</Text>
      </NB.ListItem>
      <NB.ListItem>
        <SegmentedControl
          style={styles.segment}
          values={['System', 'Light', 'Dark']}
          selectedIndex={theme.themeMode}
          onChange={(event) => {
            theme.changeTheme(event.nativeEvent.selectedSegmentIndex);
          }}
        />
      </NB.ListItem>
      <NB.ListItem itemDivider style={{backgroundColor: appTheme.card}}>
        <Text style={{color: appTheme.text}}>About</Text>
      </NB.ListItem>
      <NB.ListItem>
        <Text style={{color: appTheme.text}}>
          Version : {version}({build})
        </Text>
      </NB.ListItem>
      <NB.ListItem>
        <Button
          title="Email to developer"
          onPress={() => {
            Linking.openURL('mailto:sboh1214@gmail.com');
          }}
        />
      </NB.ListItem>
    </ScrollView>
  );
};

export default withRoot(SettingsScreen);
