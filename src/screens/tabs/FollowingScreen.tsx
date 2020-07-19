import React, {useState, useEffect, useLayoutEffect} from 'react';
import * as NB from 'native-base';
import {useNavigation} from '@react-navigation/native';
import withRoot from 'components/withRoot';
import {fetchUserRssList, deleteUserRss} from 'utils/firebase';
import {RefreshControl, ScrollView, Text, Pressable} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {
  useHeaderStyles,
  useContentStyles,
  useListStyles,
  useIsDark,
  useAppTheme,
} from 'utils/theme';
import {SCREEN} from 'utils/navigation';

const FollowingScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const headerStyles = useHeaderStyles();
  const isDark = useIsDark();
  const colors = useAppTheme();

  const setHeaderOptions = () => {
    navigation?.dangerouslyGetParent()?.setOptions({
      headerTitle: () => (
        <Text style={headerStyles.title}>{SCREEN.Following}</Text>
      ),
      headerRight: () => (
        <Pressable onPress={onAddClick}>
          <Text
            style={{color: colors.primary, marginHorizontal: 16, fontSize: 18}}>
            Add
          </Text>
        </Pressable>
      ),
    });
  };
  useLayoutEffect(() => {
    navigation.addListener('focus', setHeaderOptions);
  }, [navigation, isDark]);

  const contentStyles = useContentStyles();
  const listStyles = useListStyles();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rssList, setRssList] = useState<Array<any>>();

  const onAddClick = () => {
    navigation.navigate(SCREEN.AddNews);
  };

  useEffect(() => {
    fetchUserRssList()
      .then((docs) => {
        setRssList(docs);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [isLoading]);

  return (
    <ScrollView
      style={contentStyles.content}
      refreshControl={<RefreshControl refreshing={isLoading} />}>
      <NB.ListItem itemDivider style={listStyles.header}>
        <NB.Text style={listStyles.text}>Saved & History</NB.Text>
      </NB.ListItem>
      <NB.ListItem style={listStyles.body}>
        <NB.Text style={listStyles.text}>Saved</NB.Text>
      </NB.ListItem>
      <NB.ListItem style={listStyles.body}>
        <NB.Text style={listStyles.text}>History</NB.Text>
      </NB.ListItem>
      <NB.ListItem itemDivider style={listStyles.header}>
        <NB.Text style={listStyles.text}>Leading List</NB.Text>
      </NB.ListItem>
      <NB.ListItem>
        <NB.Text style={listStyles.text}>Please wait</NB.Text>
      </NB.ListItem>
      <NB.ListItem itemDivider style={listStyles.header}>
        <NB.Text style={listStyles.text}>Feed (RSS)</NB.Text>
      </NB.ListItem>
      <SwipeListView
        data={rssList}
        renderItem={(data) => (
          <NB.ListItem
            key={`${data.index}`}
            style={{...listStyles.body}}
            noIndent>
            <NB.Text style={listStyles.text}>
              {data.item.pressName} {data.item.rssName}
            </NB.Text>
          </NB.ListItem>
        )}
        renderHiddenItem={(data) => (
          <NB.View>
            <NB.Button
              onPress={() => {
                deleteUserRss(data.item.id);
                fetchUserRssList().then((docs) => {
                  setRssList(docs);
                });
              }}>
              <NB.Text>Delete</NB.Text>
            </NB.Button>
          </NB.View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
    </ScrollView>
  );
};

export default withRoot(FollowingScreen);
