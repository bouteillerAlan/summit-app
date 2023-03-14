import { Stack, useRouter } from 'expo-router';
import { type ReactElement } from 'react';
import { Text } from 'react-native';

const Layout = (): ReactElement => {
  const router = useRouter();

  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: 'rgb(255,224,48)' },
      headerRight: () => (<Text onPress={() => { router.push('/modal'); }} >modal</Text>)
    }}>
      <Stack.Screen name='index' options={{ title: 'home' }} />
      <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
    </Stack>
  );
};

export default Layout;
