import { Stack } from 'expo-router';
import React, { type ReactElement } from 'react';
import { NativeBaseProvider } from 'native-base';

const Layout = (): ReactElement => {
  return (
    <NativeBaseProvider>
      <Stack screenOptions={{ headerStyle: { backgroundColor: 'rgb(255,224,48)' } }}>
        <Stack.Screen name='index' options={{ headerShown: false }} />
      </Stack>
    </NativeBaseProvider>
  );
};

export default Layout;
