import { Stack } from 'expo-router';
import React, { type ReactElement } from 'react';
import { NativeBaseProvider } from 'native-base';
import { AuthProvider } from '../services/auth';

const Layout = (): ReactElement => {
  return (
    <AuthProvider>
      <NativeBaseProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='index' options={{ headerShown: false }} />
        </Stack>
      </NativeBaseProvider>
    </AuthProvider>
  );
};

export default Layout;
