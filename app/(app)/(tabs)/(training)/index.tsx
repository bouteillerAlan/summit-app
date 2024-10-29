import { router } from "expo-router";
import { Text, View, Pressable } from "react-native";
import { Link } from "expo-router";

export default function AppIndex() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>training dashboard</Text>
      <Link href="/addData">
        <Pressable>
          <Text>Add data</Text>
        </Pressable>
      </Link>
    </View>
  );
}
