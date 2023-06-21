import type {ReactElement} from 'react';
import {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {css} from '@emotion/native';
import {Typography} from 'dooboo-ui';
import {
  Redirect,
  useGlobalSearchParams,
  usePathname,
  useRouter,
} from 'expo-router';

import {t} from '../src/STRINGS';
import CustomLoadingIndicator from '../src/uis/CustomLoadingIndicator';

/* 
  For android redirect. This looks like expo router bug.
  issue: https://github.com/expo/router/issues/157
*/
export default function Unmatched(): ReactElement {
  const [showReload, setShowReload] = useState(false);
  const {replace} = useRouter();
  const pathname = usePathname();

  const param = useGlobalSearchParams();

  useEffect(() => {
    const clear = setTimeout(() => {
      setShowReload(true);
    }, 3000);

    return () => {
      clearTimeout(clear);
    };
  }, []);

  // To handle oauth redirect from android google login
  if (param.unmatched?.[0] === 'oauthredirect') {
    return <Redirect href="../" />;
  }

  /*
    To handle dynamic link
  */
  if (pathname.startsWith('/link')) {
    return <Redirect href={pathname.replace('/link', '')} />;
  }

  /*
    To handle wrong route on ios build
  */
  if (pathname.startsWith('/google/link')) {
    return <Redirect href="/" />;
  }

  return (
    <CustomLoadingIndicator
      children={
        showReload ? (
          <TouchableOpacity onPress={() => replace('/')}>
            <Typography.Body2
              style={css`
                margin-top: 12px;
                font-family: Pretendard-Bold;
              `}
            >
              {t('RELOAD')}
            </Typography.Body2>
          </TouchableOpacity>
        ) : null
      }
    />
  );
}
