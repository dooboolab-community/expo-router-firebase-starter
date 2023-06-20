import type {ReactElement} from 'react';
import {useRef, useState} from 'react';
import type {TextInput} from 'react-native';
import {Linking, Platform, ScrollView, View} from 'react-native';
import styled, {css} from '@emotion/native';
import {Button, EditText, Icon, Typography, useDooboo} from 'dooboo-ui';
import * as AppleAuthentication from 'expo-apple-authentication';
import {Link, useNavigation, useRouter} from 'expo-router';

import useKeyboard from '../../src/hooks/useKeyboard';
import {t} from '../../src/STRINGS';
import ButtonSocialSignIn from '../../src/uis/ButtonSocialSignIn';
import ModalCloseIcon from '../../src/uis/ModalCloseIcon';
import ModalHeader from '../../src/uis/ModalHeader';
import {validateEmail} from '../../src/utils/common';

const Container = styled.SafeAreaView`
  flex: 1;
  align-self: stretch;
  background-color: ${({theme}) => theme.bg.basic};
`;

const Content = styled.View`
  width: 100%;
  max-width: 600px;
  padding: 32px 48px;
  gap: 16px;
`;

export default function SignInModal(): ReactElement {
  const {back, replace} = useRouter();
  const {canGoBack} = useNavigation();
  const [keyboardHeight] = useKeyboard();
  const {theme, themeType} = useDooboo();

  const passwordRef = useRef<TextInput>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSecure, setIsSecure] = useState(true);

  const renderAgreements = (texts: string): (ReactElement | string)[] => {
    return texts.split('**').map((str, i) =>
      i % 2 === 0 ? (
        str
      ) : (
        <Typography.Body3
          key={str}
          onPress={() => {
            if (str === t('PRIVACY_POLICY')) {
              return Linking.openURL('https://dooboo.io/privacyandpolicy');
            }

            Linking.openURL('https://dooboo.io/termsofservice');
          }}
          style={css`
            text-decoration-line: underline;
          `}
        >
          {str}
        </Typography.Body3>
      ),
    );
  };

  const handleSignIn = async (): Promise<void> => {
    if (!validateEmail(email) || !password) {
      setErrorMessage(t('INVALID_CREDENTIALS'));

      return;
    }

    canGoBack() ? back() : replace('/');
  };

  const handleSignInApple = async (): Promise<void> => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const {identityToken} = credential;

      console.log('sign-in apple', identityToken);
    } catch (e: any) {
      if (
        e.code === 'ERR_REQUEST_CANCELED' ||
        e.code === 'ERR_CANCELED' ||
        e.code === 'ERR_REQUEST_UNKNOWN'
      ) {
        return;
      }
    }
  };

  return (
    <Container>
      <ModalHeader>
        <ModalCloseIcon />
      </ModalHeader>
      <ScrollView
        style={css`
          flex: 1;
        `}
        contentContainerStyle={css`
          align-items: center;
        `}
      >
        <Content>
          <ButtonSocialSignIn
            provider="google"
            text={t('LOGIN_WITH', {name: 'Google'})}
            // onUserCreated={handleSocialUserCreated}
          />
          <ButtonSocialSignIn
            style={css`
              margin-bottom: 12px;
            `}
            provider="facebook"
            text={t('LOGIN_WITH', {name: 'Facebook'})}
            // onUserCreated={handleSocialUserCreated}
          />
          {Platform.OS === 'ios' ? (
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={
                AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
              }
              buttonStyle={
                themeType === 'light'
                  ? AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
                  : AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
              }
              cornerRadius={4}
              style={css`
                height: 48px;
              `}
              onPress={handleSignInApple}
            />
          ) : null}
          <Typography.Body2
            style={css`
              font-family: Pretendard-Bold;
              color: ${theme.text.placeholder};
              align-self: center;
            `}
          >
            {t('OR')}
          </Typography.Body2>
          <EditText
            decoration="boxed"
            placeholder={t('EMAIL')}
            // editable={!isInFlight}
            styles={{
              container: css`
                border-radius: 4px;
              `,
            }}
            value={email}
            onChangeText={(text) => {
              setErrorMessage('');
              setEmail(text.trim());
            }}
            onSubmitEditing={() => {
              passwordRef.current?.focus();
            }}
            endElement={
              email ? (
                <Button
                  onPress={() => setEmail('')}
                  text={
                    <Icon
                      name="XCircleFill"
                      size={16}
                      color={theme.role.primary}
                    />
                  }
                  type="text"
                />
              ) : undefined
            }
          />
          <EditText
            inputRef={passwordRef}
            decoration="boxed"
            styles={{
              container: css`
                border-radius: 4px;
              `,
            }}
            placeholder={t('PASSWORD')}
            // editable={!isInFlight}
            secureTextEntry={isSecure}
            endElement={
              <Button
                onPress={() => setIsSecure(!isSecure)}
                text={
                  <Icon
                    name={isSecure ? 'EyeSlash' : 'Eye'}
                    size={18}
                    color={theme.role.primary}
                  />
                }
                type="text"
              />
            }
            value={password}
            onChangeText={(text) => {
              setErrorMessage('');
              setPassword(text.trim());
            }}
            onSubmitEditing={handleSignIn}
            error={errorMessage}
          />

          <Button
            text={t('SIGN_IN')}
            disabled={!email || !validateEmail(email) || !password}
            // loading={isInFlight}
            onPress={handleSignIn}
            touchableHighlightProps={{
              underlayColor: theme.text.contrast,
            }}
            styles={{
              text: css`
                font-family: Pretendard-Bold;
                font-size: 18px;
              `,
            }}
          />

          <View
            style={css`
              margin-top: 8px;
              align-self: stretch;
              align-items: center;
            `}
          >
            <Link href="/sign-up">
              <Typography.Body2
                style={css`
                  text-align: center;
                  font-family: Pretendard-Bold;
                  color: ${theme.text.placeholder};
                `}
              >
                {t('NO_ACCOUNT') + '\n'}
                <Typography.Body2
                  style={css`
                    font-family: Pretendard-Bold;
                    color: ${theme.role.primary};
                  `}
                >
                  {` ${t('CREATE_ACCOUNT')}`}
                </Typography.Body2>
              </Typography.Body2>
            </Link>
          </View>

          <Typography.Body4
            style={css`
              text-align: center;
              color: ${theme.text.placeholder};
            `}
          >
            {renderAgreements(
              t('SIGN_UP_POLICY_AGREEMENT', {
                termsForAgreement: `**${t('TERMS_OF_SERVICE')}**`,
                privacyAndPolicy: `**${t('PRIVACY_POLICY')}**`,
              }),
            )}
          </Typography.Body4>
          {keyboardHeight && Platform.OS === 'ios' ? (
            <View
              style={css`
                height: ${keyboardHeight + 'px'};
              `}
            />
          ) : null}
        </Content>
      </ScrollView>
    </Container>
  );
}
