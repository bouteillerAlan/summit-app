import { Stack } from 'expo-router';
import { type ReactElement } from 'react';

const Layout = (): ReactElement => {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: '#ffe030' } }}/>
  );
};

export default Layout;
