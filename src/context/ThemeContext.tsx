import React, { createContext, ReactNode, useContext, useState } from "react";
import { Appearance } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

interface ThemeContextType {
	isDark: boolean;
	toggleTheme: () => void;
	theme: typeof MD3LightTheme | typeof MD3DarkTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = (): ThemeContextType => {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error("useThemeContext must be used within a ThemeProvider");
	}
	return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [isDark, setIsDark] = useState(Appearance.getColorScheme() === "dark");

	const toggleTheme = () => setIsDark((prev) => !prev);

	const theme = isDark ? MD3DarkTheme : MD3LightTheme;

	return (
		<ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
			<PaperProvider theme={theme}>{children}</PaperProvider>
		</ThemeContext.Provider>
	);
};
