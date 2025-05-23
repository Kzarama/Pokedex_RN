import { useThemeContext } from "@/src/context/ThemeContext";
import { ActivityIndicator, View } from "react-native";

export const FullScreenLoader = () => {
	const { isDark } = useThemeContext();

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<ActivityIndicator size="large" color={isDark ? "white" : "black"} />
		</View>
	);
};
