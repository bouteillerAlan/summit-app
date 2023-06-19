import { Stack } from 'expo-router';
import React, { type ReactElement } from 'react';

const Layout = (): ReactElement => {
  return (
    <Stack>
      <Stack.Screen name='createWorkout' />
    </Stack>
  );
};

export default Layout;
