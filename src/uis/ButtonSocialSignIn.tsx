import type {ReactElement} from 'react';
import {useEffect} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import {Platform} from 'react-native';
import {css} from '@emotion/native';
import {IconButton, useDooboo} from 'dooboo-ui';
import * as AppleAuthentication from 'expo-apple-authentication';
import {Prompt, ResponseType} from 'expo-auth-session';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as Google from 'expo-auth-session/providers/google';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';

import {
  expoProjectId,
  facebookAppId,
  googleClientIdAndroid,
  googleClientIdIOS,
  googleClientIdWeb,
} from '../../config';
import {auth} from '../firebase';
import {colors} from '../theme';

export type Provider = 'apple' | 'facebook' | 'google' | 'github';

type Props = {
  style?: StyleProp<ViewStyle>;
  provider: Provider;
  text: string;
  onUserCreated?: () => void;
};

export function ButtonSocialSignIn({text, provider}: Props): ReactElement {
  const {theme} = useDooboo();

  const appleLogin = async (): Promise<void> => {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    const {identityToken} = credential;

    console.log('apple identityToken', identityToken);
  };

  const [googleRequest, googleResponse, googlePromptAsync] =
    Google.useAuthRequest({
      prompt: Prompt.SelectAccount,
      usePKCE: false,
      scopes: ['openid', 'profile', 'email'],
      expoClientId: expoProjectId,
      responseType: Platform.select({
        web: ResponseType.Token,
      }),
      clientId: googleClientIdIOS,
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
    const handleSignIn = async (): Promise<void> => {
      if (googleResponse?.type === 'success' && googleResponse.authentication) {
        const accessToken = googleResponse.authentication.accessToken;
        const credential = GoogleAuthProvider.credential(null, accessToken);
        await signInWithCredential(auth, credential);
      } else if (
        facebookResponse?.type === 'success' &&
        facebookResponse.authentication
      ) {
        const accessToken = facebookResponse.authentication.accessToken;
        const credential = FacebookAuthProvider.credential(accessToken);
        await signInWithCredential(auth, credential);
      }
    };

    handleSignIn();

    return () => {};
  }, [googleResponse, facebookResponse]);

  return (
    <IconButton
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
          case 'apple':
            appleLogin();
            break;
          default:
          // Not implemented yet
        }
      }}
      icon={
        provider === 'apple'
          ? 'AppleLogo'
          : provider === 'facebook'
          ? 'FacebookLogo'
          : provider === 'github'
          ? 'GithubLogo'
          : 'GoogleLogo'
      }
      touchableHighlightProps={{
        underlayColor: theme.text.contrast,
        accessibilityLabel: text,
      }}
      styles={{
        container: css`
          background-color: ${colors[provider] || theme.text.basic};
        `,
      }}
    />
  );
}

export default ButtonSocialSignIn;
