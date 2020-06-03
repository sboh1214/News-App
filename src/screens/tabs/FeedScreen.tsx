import React, {useState, useEffect} from 'react';
import * as NB from 'native-base';
import {useNavigation} from '@react-navigation/native';
import withRoot from 'components/withRoot';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import * as rssParser from 'react-native-rss-parser';
import {RefreshControl} from 'react-native';
import {cardStyles} from 'utils/styles';

const FeedScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [feedList, setFeedList] = useState<rssParser.FeedItem[]>();
  let rssList: FirebaseFirestoreTypes.QueryDocumentSnapshot[];

  const onGetRss = async () => {
    const query = await firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .collection('rssList')
      .get();
    rssList = query.docs;
    setIsEmpty(query.empty);
  };

  const onGetFeed = async () => {
    const list = await rssList?.map(async (rssItem) => {
      const res = await fetch(rssItem.data().rssUrl);
      const data = await res.text();
      const rss = await rssParser.parse(data);
      return rss.items;
    });
    const finalList = await list?.reduce(async (acc, cur) => {
      return (await acc).concat(await cur);
    });
    setFeedList(finalList?.slice(0, 20) ?? []);
  };

  const onGet = () => {
    onGetRss().then(() => {
      if (!isEmpty) {
        onGetFeed().then(() => {
          setIsLoading(false);
        });
      }
    });
  };

  useEffect(() => {
    onGet();
  }, []);

  const onAddClick = () => {
    navigation.navigate('AddNewsScreen');
  };

  return (
    <NB.Container>
      <NB.Header>
        <NB.Body>
          <NB.Title>Feed</NB.Title>
        </NB.Body>
        <NB.Right>
          <NB.Button transparent onPress={onAddClick}>
            <NB.Icon name="add" />
          </NB.Button>
        </NB.Right>
      </NB.Header>
      <NB.Content
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onGet} />
        }>
        {isEmpty ? (
          <NB.View>
            <NB.Text>There is no feed.</NB.Text>
            <NB.Button>
              <NB.Text>Go to add feed</NB.Text>
            </NB.Button>
          </NB.View>
        ) : (
          <NB.List>
            {feedList?.map((item: rssParser.FeedItem) => {
              return (
                <NB.ListItem key={item.id} style={cardStyles.listItem}>
                  <NB.Card style={cardStyles.card}>
                    <NB.CardItem style={cardStyles.cardItem}>
                      <NB.Text>{item.title}</NB.Text>
                      <NB.Text>{item.description}</NB.Text>
                    </NB.CardItem>
                  </NB.Card>
                </NB.ListItem>
              );
            })}
          </NB.List>
        )}
      </NB.Content>
    </NB.Container>
  );
};

export default withRoot(FeedScreen);
