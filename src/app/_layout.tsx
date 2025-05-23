import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="index" options={{ title: "Home" }} />
					<Stack.Screen name="[pokemon]" options={{ title: "Pokemon" }} />
					<Stack.Screen name="search" options={{ title: "Search" }} />
				</Stack>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
