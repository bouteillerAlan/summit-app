import { router } from "expo-router";
import { Text, View } from "react-native";

import { useSession } from "../services/ctx";

export default function SignIn() {
  const { signIn } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          signIn(`test`, `tesdt`);
          router.replace("/");
        }}
      >
        Sign In
      </Text>
    </View>
  );
}
