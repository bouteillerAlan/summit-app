import { View } from 'react-native';
import { Stack } from 'expo-router';
import { type ReactElement } from 'react';

const Home = (): ReactElement => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Stack.Screen options={{ title: 'Homepage' }} />
    </View>
  );
};

export default Home;
