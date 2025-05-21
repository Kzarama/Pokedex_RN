import { useThemeContext } from "@/src/context/ThemeContext";
import { PropsWithChildren } from "react";
import { PaperProvider } from "react-native-paper";

export default function Layout({ children }: PropsWithChildren) {
	const { theme } = useThemeContext();

	return <PaperProvider theme={theme}>{children}</PaperProvider>;
}
