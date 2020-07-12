import {StyleSheet, AsyncStorage, useColorScheme} from 'react-native';
import React, {useContext, createContext, useEffect, useState} from 'react';

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

export const ThemeContext = createContext({
  theme: LightTheme,
  themeMode: 0,
  changeTheme: (_) => {},
});

export const ThemeContextProvider = ({children}) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<any>(LightTheme);
  const [themeMode, setThemeMode] = useState<number>(0);

  const restoreTheme = () => {
    AsyncStorage.getItem('@theme').then((theme) => {
      setThemeMode(parseInt(theme ?? '0', 10));
      if (theme === '0') {
        if (colorScheme === 'dark') {
          setTheme(DarkTheme);
        } else {
          setTheme(LightTheme);
        }
      } else if (theme === '2') {
        setTheme(DarkTheme);
      } else {
        setTheme(LightTheme);
      }
    });
  };

  useEffect(() => {
    restoreTheme();
  }, [colorScheme]);

  const changeTheme = (newTheme: number) => {
    AsyncStorage.setItem('@theme', newTheme.toString()).then(() => {
      setThemeMode(newTheme);
      restoreTheme();
    });
  };

  return (
    <ThemeContext.Provider value={{theme, themeMode, changeTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default function useAppTheme() {
  const navTheme = useContext(ThemeContext);
  return navTheme.theme.colors;
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

export function useListStyles() {
  const appTheme = useAppTheme();

  return StyleSheet.create({
    header: {
      backgroundColor: appTheme.card,
    },
    body: {
      backgroundColor: appTheme.background,
    },
    text: {
      color: appTheme.text,
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
