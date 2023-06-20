import type {ReactNode} from 'react';
import {useEffect, useState} from 'react';
import type {ColorSchemeName} from 'react-native';
import {useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {dark, light} from '@dooboo-ui/theme';
import {css} from '@emotion/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Slot, SplashScreen} from 'expo-router';
import * as SystemUI from 'expo-system-ui';

import RootProvider from '../src/providers';
import {AsyncStorageKey} from '../src/utils/constants';

SplashScreen.preventAutoHideAsync();

export default function RootLayout(): ReactNode {
  const colorScheme = useColorScheme();
  const [localThemeType, setLocalThemeType] = useState<string | undefined>(
    undefined,
  );

  // 테마 불러오기
  useEffect(() => {
    const initializeThemeType = async (): Promise<void> => {
      const darkMode = await AsyncStorage.getItem(AsyncStorageKey.DarkMode);

      const isDarkMode = !darkMode
        ? colorScheme === 'dark'
        : darkMode === 'true';

      SystemUI.setBackgroundColorAsync(
        isDarkMode ? dark.bg.basic : light.bg.basic,
      );

      setLocalThemeType(isDarkMode ? 'dark' : 'light');
    };

    initializeThemeType();
  }, [colorScheme]);

  return (
    <RootProvider initialThemeType={localThemeType as ColorSchemeName}>
      <GestureHandlerRootView
        style={css`
          flex: 1;
        `}
      >
        <Slot />
      </GestureHandlerRootView>
    </RootProvider>
  );
}
