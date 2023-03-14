import { Text, View } from 'react-native';
import { type ReactElement } from 'react';

const Home = (): ReactElement => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello there</Text>
    </View>
  );
};

export default Home;
