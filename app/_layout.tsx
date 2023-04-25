import { Stack } from 'expo-router';
import React, { type ReactElement } from 'react';
import { NativeBaseProvider } from 'native-base';

// see https://expo.github.io/router/docs/faq#missing-back-button
// eslint-disable-next-line @typescript-eslint/naming-convention
export const unstable_settings = {
  initialRouteName: 'login'
};

const Layout = (): ReactElement => {
  return (
    <NativeBaseProvider>
      <Stack initialRouteName='login' screenOptions={{ headerStyle: { backgroundColor: 'rgb(255,224,48)' } }}>
        <Stack.Screen name='login' options={{ headerShown: false }} />
        <Stack.Screen name='dashboard' />
      </Stack>
    </NativeBaseProvider>
  );
};

export default Layout;
