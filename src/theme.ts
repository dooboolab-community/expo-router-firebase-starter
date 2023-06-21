import type {DoobooThemeParams} from '@dooboo-ui/theme';

export const colors = {
  apple: '#000000',
  google: '#E04238',
  facebook: '#345997',
};

export const light: DoobooThemeParams = {
  role: {
    primary: '#FFAB35',
  },
  button: {
    primary: {
      bg: '#FFAB35',
      text: '#000000',
    },
  },
};

export type CustomAppTheme = typeof light & DoobooThemeParams;

export const dark: typeof light = {
  role: {
    primary: '#FF812C',
  },
  button: {
    primary: {
      bg: '#FF812C',
      text: '#FFFFFF',
    },
  },
};

export const theme = {
  light,
  dark,
};
