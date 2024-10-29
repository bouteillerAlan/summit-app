import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen options={{ headerBackVisible: true }} />
    </Stack>
  );
}
