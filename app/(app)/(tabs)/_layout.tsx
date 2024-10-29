import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "black" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(weight)"
        options={{
          title: "Weight",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="male" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(training)"
        options={{
          title: "Training",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="shopping-basket" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
