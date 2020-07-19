import React, {useState, useEffect, useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import * as rssParser from 'react-native-rss-parser';
import {
  RefreshControl,
  Text,
  View,
  Button,
  FlatList,
  Pressable,
} from 'react-native';
import NewsCard from 'components/NewsCard';
import {fetchUserRssList} from 'utils/firebase';
import {
  useHeaderStyles,
  useNewsCardStyles,
  useIsDark,
  useAppTheme,
} from 'utils/theme';
import {SCREEN} from 'utils/navigation';
import withRoot from 'components/withRoot';

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const FeedScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const headerStyles = useHeaderStyles();
  const isDark = useIsDark();
  const colors = useAppTheme();

  const setHeaderOptions = () => {
    navigation?.dangerouslyGetParent()?.setOptions({
      headerTitle: () => <Text style={headerStyles.title}>{SCREEN.Feed}</Text>,
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
        setFeedList(shuffle(res));
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
            <View style={{flex: 1}}>
              <Text style={{fontSize: 18, alignSelf: 'center'}}>
                There is no feed.
              </Text>
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
