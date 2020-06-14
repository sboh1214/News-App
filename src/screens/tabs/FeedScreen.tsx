import React, {useState, useEffect} from 'react';
import * as NB from 'native-base';
import {useNavigation} from '@react-navigation/native';
import withRoot from 'components/withRoot';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import * as rssParser from 'react-native-rss-parser';
import {RefreshControl} from 'react-native';
import NewsCard, {NewsCardStyles} from 'components/NewsCard';
import {fetchUserRssList} from 'utils/fetch';
import {
  useHeaderStyles,
  useContentStyles,
  useNewsCardStyles,
} from 'utils/theme';

const FeedScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const headerStyles = useHeaderStyles();
  const contentStyles = useContentStyles();
  const newsCardStyles = useNewsCardStyles();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [feedList, setFeedList] = useState<rssParser.FeedItem[]>();
  const [rssList, setRssList] = useState<
    FirebaseFirestoreTypes.QueryDocumentSnapshot[]
  >();

  const fetchFeed = async () => {
    const list = await rssList?.map(async (rssItem) => {
      const res = await fetch(rssItem.data().rssUrl);
      const data = await res.text();
      const rss = await rssParser.parse(data);
      return rss.items;
    });
    const finalList = await list?.reduce(async (acc, cur) => {
      return (await acc).concat(await cur);
    });
    return finalList;
  };

  useEffect(() => {
    fetchUserRssList().then((docs) => {
      setRssList(docs);
    });
  }, [isLoading]);

  useEffect(() => {
    fetchFeed()
      .then((res) => {
        setFeedList(res?.slice(0, 20));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [rssList]);

  const onAddClick = () => {
    navigation.navigate('AddNewsScreen');
  };

  return (
    <NB.Container>
      <NB.Header style={headerStyles.header}>
        <NB.Left style={headerStyles.left} />
        <NB.Body style={headerStyles.body}>
          <NB.Title style={headerStyles.bodyText}>Feed</NB.Title>
        </NB.Body>
        <NB.Right style={headerStyles.right}>
          <NB.Button transparent onPress={onAddClick}>
            <NB.Icon name="add" />
          </NB.Button>
        </NB.Right>
      </NB.Header>
      <NB.Content
        style={contentStyles.content}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              setIsLoading(true);
            }}
          />
        }>
        {feedList === undefined ? (
          <NB.View>
            <NB.Text>There is no feed.</NB.Text>
            <NB.Button
              onPress={() => {
                navigation.navigate('AddNewsScreen');
              }}>
              <NB.Text>Go to add feed</NB.Text>
            </NB.Button>
          </NB.View>
        ) : (
          <NB.List>
            {feedList?.map((item: rssParser.FeedItem) => {
              return (
                <NB.ListItem
                  key={item.title}
                  noBorder
                  style={NewsCardStyles.listItem}>
                  <NewsCard
                    style={newsCardStyles.newsCard}
                    type="Small"
                    title={item.title}
                    onPress={() => {
                      navigation.navigate('NewsScreen', {
                        title: item.title,
                        link: item.links[0].url,
                      });
                    }}
                  />
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
