import React, {useState, useEffect, useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import * as rssParser from 'react-native-rss-parser';
import {RefreshControl, Text, View, Button, FlatList} from 'react-native';
import NewsCard from 'components/NewsCard';
import {fetchUserRssList} from 'utils/firebase';
import {useHeaderStyles, useNewsCardStyles, useIsDark} from 'utils/theme';
import {SCREEN} from 'utils/navigation';
import withRoot from 'components/withRoot';

const FeedScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const headerStyles = useHeaderStyles();
  const isDark = useIsDark();
  const setHeaderOptions = () => {
    navigation?.dangerouslyGetParent()?.setOptions({
      headerTitle: () => <Text style={headerStyles.title}>{SCREEN.Feed}</Text>,
      headerRight: () => <Button title="Add" onPress={onAddClick} />,
    });
  };
  useLayoutEffect(() => {
    navigation.addListener('focus', setHeaderOptions);
  }, [navigation, isDark]);

  const newsCardStyles = useNewsCardStyles();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [feedList, setFeedList] = useState<rssParser.FeedItem[]>();
  const [rssList, setRssList] = useState<Array<any>>();

  const fetchFeed = async () => {
    const list = await rssList?.map(async (rssItem) => {
      const res = await fetch(rssItem.rssUrl);
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
        setFeedList(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [rssList]);

  const onAddClick = () => {
    navigation.navigate(SCREEN.AddNews);
  };

  return (
    <FlatList
      data={feedList}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            setIsLoading(true);
          }}
        />
      }
      ListHeaderComponent={() => {
        if (feedList === undefined) {
          return (
            <View>
              <Text>There is no feed.</Text>
              <Button
                title="Go to add feed"
                onPress={() => {
                  navigation.navigate(SCREEN.AddNews);
                }}
              />
            </View>
          );
        } else {
          return null;
        }
      }}
      renderItem={({item, index}) => {
        return (
          <View key={index.toString()}>
            <NewsCard
              style={newsCardStyles.newsCard}
              type="Small"
              title={item.title}
              onPress={() => {
                navigation.navigate(SCREEN.News, {
                  title: item.title,
                  link: item.links[0].url,
                });
              }}
            />
          </View>
        );
      }}
    />
  );
};

export default withRoot(FeedScreen);
