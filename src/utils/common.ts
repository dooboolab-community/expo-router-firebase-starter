import {Linking, Platform} from 'react-native';
import type {IconName} from 'dooboo-ui';

export const validateEmail = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
};

export const validatePassword = (password: string): boolean => {
  const re = /^.*(?=.{6,15})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

  return re.test(password);
};

export function checkUsernameValid(input: string): boolean {
  const regex = /^[a-z0-9._]*$/;

  return regex.test(input);
}

export function deepEqual(obj1: any, obj2: any): boolean {
  function isObject(object: unknown): boolean {
    return object != null && typeof object === 'object';
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
}

export const isImageHttp = (url: string): boolean => {
  return url.includes('http://') || url.includes('https://');
};

export function getUniqueElements<T>(arr1: T[], arr2: T[]): T[] {
  const uniqueElements: T[] = [];

  arr1.forEach((element: T) => {
    if (!arr2.includes(element)) {
      uniqueElements.push(element);
    }
  });

  arr2.forEach((element: T) => {
    if (!arr1.includes(element)) {
      uniqueElements.push(element);
    }
  });

  return uniqueElements;
}

export function formatDate(dateString: string): string {
  // Convert the string to a Date object
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return '';
  }

  // Format the date
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();

  // Return the formatted date string (in this example it's in format 'dd-mm-yyyy')
  return `${year}-${month}-${day}`;
}

export function formatTime(input: string): string {
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (!regex.test(input)) {
    return '';
  }

  return input;
}

export const convertVersionNameToNumber = (versionName: string): number => {
  // The version name format is x.x.x (e.g. 1.0.0)
  const versionParts = versionName.split('.');
  const major = parseInt(versionParts[0], 10) * 100;
  const minor = parseInt(versionParts[1], 10) * 10;
  const patch = parseInt(versionParts[2], 10);

  return major + minor + patch;
};

export const goToAppStore = (): void => {
  Platform.OS === 'ios'
    ? Linking.openURL(
        'itms-apps://itunes.apple.com/us/app/apple-store/1639880015?mt=8',
      )
    : Linking.openURL('market://details?id=io.dooboo');
};

export const getNumOfLineBreaks = (text: string): number =>
  (text.match(/\n/g) || []).length;

type SocialMedia =
  | 'Instagram'
  | 'Tiktok'
  | 'Facebook'
  | 'Twitter'
  | 'Linkedin'
  | 'Youtube';

export const checkSocialMediaUrl = (url: string): SocialMedia | 'Unknown' => {
  const patterns: {[K in SocialMedia]: RegExp} = {
    Instagram: new RegExp('https?://(?:www.)?instagram.com/.*'),
    Tiktok: new RegExp('https?://(?:www.)?Tiktok.com/.*'),
    Facebook: new RegExp('https?://(?:www.)?facebook.com/.*'),
    Twitter: new RegExp('https?://(?:www.)?twitter.com/.*'),
    Linkedin: new RegExp('https?://(?:www.)?Linkedin.com/.*'),
    Youtube: new RegExp('https?://(?:www.)?youtube.com/.*'),
  };

  for (const platform in patterns) {
    if (patterns[platform as SocialMedia].test(url)) {
      return platform as SocialMedia;
    }
  }

  return 'Unknown';
};

export const getSocialMediaIcon = (
  socialMedia: SocialMedia | 'Unknown',
): IconName => {
  return socialMedia === 'Facebook'
    ? 'FacebookLogo'
    : socialMedia === 'Instagram'
    ? 'InstagramLogo'
    : socialMedia === 'Twitter'
    ? 'TwitterLogo'
    : socialMedia === 'Youtube'
    ? 'YoutubeLogo'
    : socialMedia === 'Linkedin'
    ? 'LinkedinLogo'
    : socialMedia === 'Tiktok'
    ? 'TiktokLogo'
    : 'GlobeSimple';
};

export function arraysAreEqual(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((val, index) => val === b[index]);
}
