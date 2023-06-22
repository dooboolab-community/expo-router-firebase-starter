import Constants from 'expo-constants';

const extra = Constants?.expoConfig?.extra;

export const ROOT_URL = extra?.ROOT_URL;

export const googleClientIdIOS = extra?.googleClientIdIOS;
export const googleClientIdAndroid = extra?.googleClientIdAndroid;
export const googleClientIdWeb = extra?.googleClientIdWeb;
export const facebookAppId = extra?.facebookAppId;
export const onesignalAppId = extra?.onesignalAppId;
export const expoProjectId = extra?.expoProjectId;
export const firebaseWebApiKey = extra?.firebaseWebApiKey;
export const authDomain = extra?.authDomain;
export const projectId = extra?.projectId;
export const storageBucket = extra?.storageBucket;
export const messagingSenderId = extra?.messagingSenderId;
export const appId = extra?.appId;
export const measurementId = extra?.measurementId;

export const appVersion = Constants?.expoConfig?.version;
