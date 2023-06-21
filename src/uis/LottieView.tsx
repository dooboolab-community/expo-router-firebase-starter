import type {ReactElement} from 'react';
import React from 'react';
import {Platform} from 'react-native';
import {css} from '@emotion/native';
import {LoadingIndicator} from 'dooboo-ui';
import type {AnimatedLottieViewProps} from 'lottie-react-native';
import LottieReactNative from 'lottie-react-native';

import DoobooLoading from '../../assets/lotties/dooboo_loading.json';

type LottieSourceType = 'dooboo-loading';

const LottieView = (
  props: Omit<AnimatedLottieViewProps, 'source'> & {
    type?: LottieSourceType;
  },
): ReactElement => {
  if (Platform.OS === 'web') {
    return (
      <LoadingIndicator
        style={css`
          margin: 12px 0;
        `}
      />
    );
  }

  return (
    <LottieReactNative
      autoPlay
      style={css`
        margin: 12px 0;
      `}
      {...props}
      source={props.type === 'dooboo-loading' ? DoobooLoading : DoobooLoading}
    />
  );
};

export default LottieView;
