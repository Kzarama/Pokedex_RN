import { useThemeContext } from "@/src/context/ThemeContext";
import { Stack } from "expo-router";
import { PropsWithChildren } from "react";

export default function ScreenLayout({ children }: PropsWithChildren) {
	const { isDark } = useThemeContext();

	return (
		<>
			<Stack.Screen options={{ contentStyle: { backgroundColor: isDark ? "#333" : "white" } }} />
			{children}
		</>
	);
}
