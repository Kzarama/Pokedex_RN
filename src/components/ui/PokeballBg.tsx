import { useThemeContext } from "@/src/context/ThemeContext";
import { Image, ImageStyle, StyleProp } from "react-native";

interface IProps {
	style?: StyleProp<ImageStyle>;
}

export const PokeballBg = ({ style }: IProps) => {
	const { isDark } = useThemeContext();

	const pokeballImg = isDark ? require("../../../assets/pokeball-light.png") : require("../../../assets/pokeball-dark.png");

	return <Image source={pokeballImg} style={[{ width: 300, height: 300 }, style]} />;
};
