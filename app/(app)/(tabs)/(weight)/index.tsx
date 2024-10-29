import { router } from "expo-router";
import { Text, View, Pressable } from "react-native";
import { Link } from "expo-router";

export default function AppIndex() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>weight dashboard</Text>
      <Link replace href="/addData">
        addData
      </Link>
      <Link replace href="/editData">
        editData
      </Link>
    </View>
  );
}
