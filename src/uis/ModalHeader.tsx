import type {ReactElement} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import {Platform, View} from 'react-native';
import {css} from '@emotion/native';

export default function ModalHeader({
  children,
  style,
}: {
  style?: StyleProp<ViewStyle>;
  children: ReactElement;
}): ReactElement {
  return (
    <View
      style={[
        css`
          padding: ${Platform.OS === 'android' ? '28px 12px' : '18px 12px'};

          justify-content: center;
          align-items: flex-end;
        `,
        style,
      ]}
    >
      {children}
    </View>
  );
}
