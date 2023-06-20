import {useEffect, useState} from 'react';
import type {KeyboardEvent} from 'react-native';
import {Keyboard} from 'react-native';

type ConfigType = {
  useWillShow?: boolean;
  useWillHide?: boolean;
};

type ReturnType = [number, () => void];

export default (config: ConfigType = {}): ReturnType => {
  const {useWillShow = false, useWillHide = false} = config;
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const showEvent: 'keyboardWillShow' | 'keyboardDidShow' = useWillShow
    ? 'keyboardWillShow'
    : 'keyboardDidShow';

  const hideEvent: 'keyboardWillHide' | 'keyboardDidHide' = useWillHide
    ? 'keyboardWillHide'
    : 'keyboardDidHide';

  const dismiss = (): void => {
    Keyboard.dismiss();
    setKeyboardHeight(0);
  };

  useEffect(() => {
    const onKeyboardShow = (e: KeyboardEvent): void => {
      setKeyboardHeight(e.endCoordinates.height);
    };

    const onKeyboardHide = (): void => {
      setKeyboardHeight(0);
    };

    const showSubscription = Keyboard.addListener(showEvent, onKeyboardShow);
    const hideSubscription = Keyboard.addListener(hideEvent, onKeyboardHide);

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [useWillShow, useWillHide, showEvent, hideEvent]);

  return [keyboardHeight, dismiss];
};
