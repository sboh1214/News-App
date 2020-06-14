import React, {useState, useEffect} from 'react';
import * as NB from 'native-base';
import {useNavigation} from '@react-navigation/native';
import withRoot from 'components/withRoot';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {fetchUserRssList, deleteUserRss} from 'utils/fetch';
import {RefreshControl} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {searchStyles} from 'utils/styles';
import {useHeaderStyles, useContentStyles} from 'utils/theme';

const FollowingScreen = (): JSX.Element => {
  const navigation = useNavigation();

  const headerStyles = useHeaderStyles();
  const contentStyles = useContentStyles();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rssList, setRssList] = useState<
    FirebaseFirestoreTypes.QueryDocumentSnapshot[]
  >();

  const onAddClick = () => {
    navigation.navigate('AddNewsScreen');
  };

  useEffect(() => {
    fetchUserRssList().then((docs) => {
      setRssList(docs);
      setIsLoading(false);
    });
  }, [isLoading]);

  return (
    <NB.Container>
      <NB.Header style={headerStyles.header}>
        <NB.Left style={headerStyles.left} />
        <NB.Body style={headerStyles.body}>
          <NB.Title style={headerStyles.bodyText}>Following</NB.Title>
        </NB.Body>
        <NB.Right style={headerStyles.right}>
          <NB.Button transparent onPress={onAddClick}>
            <NB.Icon name="add" />
          </NB.Button>
        </NB.Right>
      </NB.Header>
      <NB.Content
        style={contentStyles.content}
        refreshControl={<RefreshControl refreshing={isLoading} />}>
        <NB.ListItem itemDivider>
          <NB.Text>Saved & History</NB.Text>
        </NB.ListItem>
        <NB.ListItem>
          <NB.Text>Saved</NB.Text>
        </NB.ListItem>
        <NB.ListItem>
          <NB.Text>History</NB.Text>
        </NB.ListItem>
        <NB.ListItem itemDivider>
          <NB.Text>Leading List</NB.Text>
        </NB.ListItem>
        <NB.ListItem>
          <NB.Text>Please wait</NB.Text>
        </NB.ListItem>
        <SwipeListView
          data={rssList}
          ListHeaderComponent={() => {
            return (
              <NB.View>
                <NB.Text>Feed (RSS)</NB.Text>
              </NB.View>
            );
          }}
          renderItem={(data) => (
            <NB.ListItem
              key={data.item.id}
              style={searchStyles.listItem}
              noIndent>
              <NB.Text>
                {data.item.data().pressId} {data.item.data().rssId}
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
      </NB.Content>
    </NB.Container>
  );
};

export default withRoot(FollowingScreen);
