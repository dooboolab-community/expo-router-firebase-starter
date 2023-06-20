import type {ReactElement} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import {css} from '@emotion/native';
import {Icon} from 'dooboo-ui';
import CustomPressable from 'dooboo-ui/uis/CustomPressable';
import {useNavigation, useRouter} from 'expo-router';

import {delayPressIn} from '../utils/constants';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export default function ModalCloseIcon({style}: Props): ReactElement {
  const router = useRouter();
  const navigation = useNavigation();

  const handlePress = (): void => {
    navigation.canGoBack() ? router.back() : router.replace('/');
  };

  return (
    <CustomPressable
      delayHoverIn={delayPressIn}
      onPress={handlePress}
      style={[
        css`
          padding: 8px;
          border-radius: 48px;
        `,
        style,
      ]}
      hitSlop={{top: 5, left: 5, right: 5, bottom: 5}}
    >
      <Icon name="X" size={18} />
    </CustomPressable>
  );
}
