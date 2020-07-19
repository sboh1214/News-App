import React, {useState, useEffect} from 'react';
import * as NB from 'native-base';
import cheerio from 'react-native-cheerio';
import {StyleSheet} from 'react-native';
import {getSelector} from 'utils/firebase';

type ReadingViewProps = {
  title: string;
  link: string;
  style: {
    textColor: string;
  };
};

export default function ReadingView({title, link, style}: ReadingViewProps) {
  const [contentList, setContentList] = useState<Array<string>>();

  const readingViewStyle = StyleSheet.create({
    title: {
      color: style.textColor,
      fontSize: 32,
      fontWeight: 'bold',
      margin: 6,
    },
    body: {
      color: style.textColor,
      margin: 6,
    },
  });

  useEffect(() => {
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        const doc = cheerio.load(request.response);
        const regex = /^(([^:/?#]+:)?(?:\/\/((?:([^/?#:]*):([^/?#:]*)@)?([^/?#:]*)(?::([^/?#:]*))?)))?([^?#]*)(\?[^#]*)?(#.*)?$/;
        const host = (link.match(regex) ?? ['', '', '', 'error'])[3];
        getSelector(host).then((selector) => {
          const contents = doc(selector);
          const list: Array<string> = [];
          contents.each((_: number, element: CheerioElement) => {
            list.push(doc(element).text());
          });
          console.log({selector, list});
          setContentList(list);
        });
      }
    };
    request.open('GET', link);
    request.send();
  }, [link]);

  return (
    <NB.View>
      <NB.Text style={readingViewStyle.title}>{title}</NB.Text>
      {contentList?.map((value) => {
        return <NB.Text style={readingViewStyle.body}>{value}</NB.Text>;
      })}
    </NB.View>
  );
}
