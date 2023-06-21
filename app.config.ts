import 'dotenv/config';

import type {ConfigContext, ExpoConfig} from '@expo/config';
import withAndroidLocalizedName from '@mmomtchev/expo-android-localized-app-name';

import {version} from './package.json';

const DEEP_LINK_URL = '[firebaseAppId].web.app';

const buildNumber = 63;

export default ({config}: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'dooboo-pro',
  scheme: 'dooboo-pro',
  slug: 'dooboo-pro',
  privacy: 'public',
  platforms: ['ios', 'android', 'web'],
  version,
  orientation: 'default',
  icon: './assets/icon.png',
  plugins: [
    // @ts-ignore
    withAndroidLocalizedName,
    'sentry-expo',
    'expo-tracking-transparency',
    '@react-native-firebase/app',
    '@react-native-firebase/dynamic-links',
    'expo-localization',
    [
      'onesignal-expo-plugin',
      {
        mode: 'development',
        smallIcons: ['./assets/ic_stat_onesignal_default.png'],
        // devTeam: '',
      },
    ],
  ],
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#1B1B1B',
  },
  extra: {
    ROOT_URL: process.env.ROOT_URL,
    googleClientIdIOS: process.env.googleClientIdIOS,
    googleClientIdAndroid: process.env.googleClientIdAndroid,
    googleClientIdWeb: process.env.googleClientIdWeb,
    facebookAppId: process.env.facebookAppId,
    onesignalAppId: process.env.onesignalAppId,
    expoProjectId: process.env.expoProjectId,
    firebaseWebApiKey: process.env.firebaseWebApiKey,
    // eas: {projectId: ''},
  },
  updates: {
    fallbackToCacheTimeout: 0,
    // requestHeaders: {'expo-channel-name': 'production'},
    // url: '',
  },
  runtimeVersion: '48.0.0',
  assetBundlePatterns: ['**/*'],
  userInterfaceStyle: 'automatic',
  locales: {
    ko: './assets/langs/ios/ko.json',
  },
  ios: {
    buildNumber: buildNumber.toString(),
    bundleIdentifier: 'com.dooboolab',
    associatedDomains: [`applinks:${DEEP_LINK_URL}`],
    supportsTablet: true,
    entitlements: {
      'com.apple.developer.applesignin': ['Default'],
    },
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
    },
  },
  android: {
    userInterfaceStyle: 'automatic',
    permissions: [
      'RECEIVE_BOOT_COMPLETED',
      'CAMERA',
      'CAMERA_ROLL',
      'READ_EXTERNAL_STORAGE',
      'WRITE_EXTERNAL_STORAGE',
      'NOTIFICATIONS',
      'USER_FACING_NOTIFICATIONS',
    ],
    adaptiveIcon: {
      foregroundImage: './assets/adaptive_icon.png',
      backgroundColor: '#2F2F2F',
    },
    // package: 'com.dooboolab',
    // intentFilters: [
    //   {
    //     action: 'VIEW',
    //     autoVerify: true,
    //     data: {
    //       scheme: 'https',
    //       host: DEEP_LINK_URL,
    //       pathPrefix: '/',
    //     },
    //     category: ['BROWSABLE', 'DEFAULT'],
    //   },
    // ],
  },
  description: 'Starter project from dooboo-cli.',
  web: {bundler: 'metro'},
});
