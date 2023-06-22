import type {ReactElement} from 'react';
import {useRef, useState} from 'react';
import type {TextInput} from 'react-native';
import {Linking, Platform, ScrollView, View} from 'react-native';
import styled, {css} from '@emotion/native';
import {Button, EditText, Icon, Typography, useDooboo} from 'dooboo-ui';
import {Link, useNavigation, useRouter} from 'expo-router';
import type {User} from 'firebase/auth';
import {signInWithEmailAndPassword} from 'firebase/auth';

import {auth} from '../../src/firebase';
import useKeyboard from '../../src/hooks/useKeyboard';
import {t} from '../../src/STRINGS';
import ButtonSocialSignIn from '../../src/uis/ButtonSocialSignIn';
import ModalCloseIcon from '../../src/uis/ModalCloseIcon';
import {validateEmail} from '../../src/utils/common';
import {SvgIcon} from '../../src/utils/icons';

const Container = styled.SafeAreaView`
  flex: 1;
  align-self: stretch;
  background-color: ${({theme}) => theme.bg.basic};
`;

const Content = styled.View`
  width: 100%;
  max-width: 600px;
  padding: 32px 48px;
  gap: 20px;
`;

export default function SignInModal(): ReactElement {
  const {back, replace} = useRouter();
  const {canGoBack} = useNavigation();
  const [keyboardHeight] = useKeyboard();
  const {theme} = useDooboo();

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
            color: ${theme.role.primary};
            font-family: Pretendard-Bold;
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

    const loginUser = async (
      userEmail: string,
      userPassword: string,
    ): Promise<User> => {
      try {
        const authResult = await signInWithEmailAndPassword(
          auth,
          userEmail,
          userPassword,
        );
        const user = authResult.user;

        return user;
      } catch (error) {
        console.log('Error login user:', error);

        return null;
      }
    };

    loginUser(email, password);
    canGoBack() ? back() : replace('/');
  };

  return (
    <Container>
      <ScrollView
        style={css`
          flex: 1;
        `}
        contentContainerStyle={css`
          align-items: center;
        `}
      >
        <SvgIcon
          width={80}
          height={80}
          style={css`
            margin-top: 60px;
            margin-bottom: 8px;
          `}
        />
        {/* Title */}
        <Typography.Heading1
          style={css`
            margin-bottom: 20px;
          `}
        >
          dooboo .{' '}
          <Typography.Heading1
            style={css`
              color: ${theme.role.primary};
            `}
          >
            pro
          </Typography.Heading1>
        </Typography.Heading1>
        <Content>
          {/* Email / PW Inputs */}
          <View
            style={css`
              gap: 10px;
            `}
          >
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
                        color={theme.text.basic}
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
                      color={theme.text.basic}
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
          </View>

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

          <Typography.Body2
            style={css`
              font-family: Pretendard-Bold;
              color: ${theme.text.placeholder};
              align-self: center;
            `}
          >
            {t('OR')}
          </Typography.Body2>

          <View
            style={css`
              flex-direction: row;
              justify-content: center;
              gap: 20px;
            `}
          >
            {Platform.OS === 'ios' ? (
              <ButtonSocialSignIn
                provider="apple"
                text={t('LOGIN_WITH', {name: 'Apple'})}
                // onUserCreated={handleSocialUserCreated}
              />
            ) : null}
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
          </View>

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
                {t('NO_ACCOUNT')}
                <Typography.Body2
                  style={css`
                    font-family: Pretendard-Bold;
                    color: ${theme.text.basic};
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
              line-height: 20px;
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
      {/* Modal close icon */}
      <View
        style={css`
          position: absolute;
          top: 16px;
          right: 16px;
        `}
      >
        <ModalCloseIcon />
      </View>
    </Container>
  );
}
