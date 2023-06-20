import type {ReactElement} from 'react';
import styled from '@emotion/native';
import {useDooboo} from 'dooboo-ui';
import StatusBarBrightness from 'dooboo-ui/uis/StatusbarBrightness';
import {Stack} from 'expo-router';

function Index(): React.ReactElement {
  const {theme} = useDooboo();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.bg.basic,
        },
        headerTintColor: theme.text.label,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: theme.text.basic,
        },
      }}
    >
      {/* Note: Only modals are written here.  */}
    </Stack>
  );
}

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  background-color: ${({theme}) => theme.bg.paper};
`;

export default function LayoutWithProvider(): ReactElement {
  return (
    <Container>
      <StatusBarBrightness />
      <Index />
    </Container>
  );
}
