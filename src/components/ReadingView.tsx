import React, {useState, useEffect} from 'react';
import * as NB from 'native-base';
import cheerio from 'react-native-cheerio';
import {StyleSheet} from 'react-native';

type ReadingViewProps = {
  title: string;
  link: string;
};

const readingViewStyle = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 6,
  },
});

export default function ReadingView({title, link}: ReadingViewProps) {
  const [contentList, setContentList] = useState<Array<string>>();

  useEffect(() => {
    const request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        const doc = cheerio.load(request.response);
        const contents = doc('#articleBodyContents');
        const list: Array<string> = [];
        contents.each((index: number, element: CheerioElement) => {
          list.push(doc(element).text());
        });
        setContentList(list);
      }
    };
    request.open('GET', link);
    request.send();
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
