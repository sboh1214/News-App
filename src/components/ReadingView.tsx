import React, {useState, useEffect} from 'react';
import * as NB from 'native-base';
import {News} from 'utils/NaverNews';
import cheerio from 'react-native-cheerio';
import iconv from 'iconv-lite';
import RNFetchBlob from 'rn-fetch-blob';
import {Buffer} from 'buffer';

type ReadingViewProps = {
  news: News;
};

export default function ReadingView({news}: ReadingViewProps) {
  const [contentList, setContentList] = useState<Array<string>>();

  useEffect(() => {
    RNFetchBlob.fetch('GET', news.link).then((result) => {
      console.log(result.respInfo);
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
  }, [news.link]);

  return (
    <NB.View>
      <NB.Title>{news.title}</NB.Title>
      {contentList?.map((value) => {
        return <NB.Text>{value}</NB.Text>;
      })}
    </NB.View>
  );
}
