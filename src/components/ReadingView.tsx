import React, {useState, useEffect} from 'react';
import * as NB from 'native-base';
import cheerio from 'react-native-cheerio';
import iconv from 'iconv-lite';
import RNFetchBlob from 'rn-fetch-blob';
import {Buffer} from 'buffer';
import {StyleSheet} from 'react-native';
import {News} from 'utils/params';

const readingViewStyle = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 6,
  },
});

export default function ReadingView({title, link}: News) {
  const [contentList, setContentList] = useState<Array<string>>();

  useEffect(() => {
    RNFetchBlob.fetch('GET', link).then((result) => {
      const text = iconv.decode(
        Buffer.from(result.base64(), 'base64'),
        'EUC-KR',
      );
      const doc = cheerio.load(text);
      const contents = doc('#articleBodyContents');
      const list: Array<string> = [];
      contents.each((index: number, element: CheerioElement) => {
        list.push(doc(element).text());
      });
      setContentList(list);
    });
  }, [link]);

  return (
    <NB.View>
      <NB.Text style={readingViewStyle.title}>{title}</NB.Text>
      {contentList?.map((value) => {
        return <NB.Text>{value}</NB.Text>;
      })}
    </NB.View>
  );
}
