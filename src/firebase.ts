import {getApp, getApps, initializeApp} from 'firebase/app';
import {browserLocalPersistence, getAuth, setPersistence} from 'firebase/auth';

import {
  appId,
  authDomain,
  firebaseWebApiKey,
  measurementId,
  messagingSenderId,
  projectId,
  storageBucket,
} from '../config';

const firebaseConfig = {
  apiKey: firebaseWebApiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence);
