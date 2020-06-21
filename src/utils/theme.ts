import {useState, useEffect} from 'react';
import {useColorScheme, StyleSheet} from 'react-native';

type ThemeColors = {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
};

export const LightTheme = {
  dark: false,
  colors: {
    primary: 'rgb(0, 122, 255)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(224, 224, 224)',
  },
};

export const DarkTheme = {
  dark: true,
  colors: {
    primary: 'rgb(10, 132, 255)',
    background: 'rgb(1, 1, 1)',
    card: 'rgb(18, 18, 18)',
    text: 'rgb(229, 229, 231)',
    border: 'rgb(39, 39, 41)',
  },
};

export default function useAppTheme() {
  const colorScheme = useColorScheme();
  const [appTheme, setAppTheme] = useState<ThemeColors>(LightTheme.colors);

  useEffect(() => {
    if (colorScheme === 'dark') {
      setAppTheme(DarkTheme.colors);
    } else {
      setAppTheme(LightTheme.colors);
    }
  }, [colorScheme]);

  return appTheme;
}

export function useHeaderStyles() {
  const appTheme = useAppTheme();

  return StyleSheet.create({
    header: {
      backgroundColor: appTheme.card,
      borderColor: appTheme.card,
    },
    thickHeader: {
      backgroundColor: appTheme.card,
      borderColor: appTheme.card,
      height: 84,
    },
    left: {
      flex: 0,
    },
    body: {
      flex: 1,
      textAlign: 'center',
    },
    bodyText: {
      color: appTheme.text,
    },
    right: {
      flex: 0,
    },
  });
}

export function useContentStyles() {
  const appTheme = useAppTheme();

  return StyleSheet.create({
    content: {
      backgroundColor: appTheme.background,
    },
  });
}

export function useNewsCardStyles() {
  const appTheme = useAppTheme();

  return {
    newsCard: {
      backgroundColor: appTheme.background,
      textColor: appTheme.text,
    },
  };
}

export function useFooterStyles() {
  const appTheme = useAppTheme();

  return StyleSheet.create({
    content: {
      flex: 1,
    },
    footer: {
      backgroundColor: appTheme.card,
    },
    footerTab: {
      flex: 1,
    },
    footerView: {
      flexDirection: 'row',
    },
    footerSegment: {
      height: 48,
      flex: 1,
    },
  });
}
