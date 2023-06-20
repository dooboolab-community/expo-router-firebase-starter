import type {ReactElement} from 'react';
import {useEffect} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import {Platform} from 'react-native';
import {css} from '@emotion/native';
import {Button, Icon, useDooboo} from 'dooboo-ui';
import {Prompt, ResponseType} from 'expo-auth-session';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as Google from 'expo-auth-session/providers/google';

import {
  expoProjectId,
  facebookAppId,
  googleClientIdAndroid,
  googleClientIdIOS,
  googleClientIdWeb,
} from '../../config';
import {colors} from '../theme';

export type Provider = 'apple' | 'facebook' | 'google' | 'github';

type Props = {
  style?: StyleProp<ViewStyle>;
  provider: Provider;
  text: string;
  onUserCreated?: () => void;
};

export function ButtonSocialSignIn({
  onUserCreated,
  text,
  provider,
}: Props): ReactElement {
  const {theme} = useDooboo();

  const [googleRequest, googleResponse, googlePromptAsync] =
    Google.useAuthRequest({
      prompt: Prompt.SelectAccount,
      usePKCE: false,
      scopes: ['openid', 'profile', 'email'],
      expoClientId: expoProjectId,
      responseType: Platform.select({
        web: ResponseType.Token,
      }),
      androidClientId: googleClientIdAndroid,
      iosClientId: googleClientIdIOS,
      webClientId: googleClientIdWeb,
    });

  const [facebookRequest, facebookResponse, facebookPromptAsync] =
    Facebook.useAuthRequest({
      clientId: facebookAppId,
      responseType: Platform.select({
        web: ResponseType.Token,
      }),
    });

  useEffect(() => {
    if (googleResponse?.type === 'success' && googleResponse.authentication) {
      const accessToken = googleResponse.authentication.accessToken;
      console.log('google accessToken', accessToken);
    } else if (
      facebookResponse?.type === 'success' &&
      facebookResponse.authentication
    ) {
      const accessToken = facebookResponse.authentication.accessToken;
      console.log('facebook accessToken', accessToken);
    }

    return () => {};
  }, [googleResponse, facebookResponse]);

  return (
    <Button
      // loading={isGoogleInFlight || isFacebookInFlight}
      disabled={provider === 'google' ? !googleRequest : !facebookRequest}
      onPress={() => {
        switch (provider) {
          case 'google':
            googlePromptAsync();
            break;
          case 'facebook':
            facebookPromptAsync();
            break;
          default:
          // Not implemented yet
        }
      }}
      text={text}
      startElement={
        <Icon
          name={
            provider === 'apple'
              ? 'AppleLogo'
              : provider === 'facebook'
              ? 'FacebookLogo'
              : provider === 'github'
              ? 'GithubLogo'
              : 'GoogleLogo'
          }
          size={16}
          style={css`
            margin-right: 5px;
            color: ${theme.text.contrast};
          `}
        />
      }
      touchableHighlightProps={{
        underlayColor: theme.text.contrast,
      }}
      styles={{
        container: css`
          background-color: ${colors[provider] || theme.text.basic};
        `,
        text: css`
          color: ${theme.text.contrast};
          font-size: 18px;
        `,
      }}
    />
  );
}

export default ButtonSocialSignIn;
