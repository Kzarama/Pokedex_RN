import { Stack } from "expo-router";
import Layout from "../components/Layouts/Layout";
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout() {
	return (
		<ThemeProvider>
			<Layout>
				<Stack>
					<Stack.Screen name="index" options={{ title: "Home" }} />
					<Stack.Screen name="Pokemon" options={{ title: "Pokemon" }} />
					<Stack.Screen name="Search" options={{ title: "Search" }} />
				</Stack>
			</Layout>
		</ThemeProvider>
	);
}
