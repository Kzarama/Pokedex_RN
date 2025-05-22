import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getPokemons } from "../actions/pokemons/get-pokemons";
import ScreenLayout from "../components/Layouts/ScreenLayout";
import { PokemonCard } from "../components/pokemons/PokemonCard";
import { PokeballBg } from "../components/ui/PokeballBg";
import { globalTheme } from "../config/theme/global-theme";

export default function Home() {
	const { top } = useSafeAreaInsets();
	const { data: pokemons, isLoading } = useQuery({
		queryKey: ["pokemons"],
		queryFn: () => getPokemons(0),
		staleTime: 1000 * 60 * 60,
	});

	return (
		<ScreenLayout>
			<View style={globalTheme.globalMargin}>
				<PokeballBg style={styles.imgPosition} />
				<FlatList
					data={pokemons}
					keyExtractor={({ id }, index) => `${id}-${index}`}
					numColumns={2}
					style={{ marginTop: top + 20 }}
					ListHeaderComponent={() => <Text variant="displayMedium">Pokedex</Text>}
					renderItem={({ item }) => <PokemonCard pokemon={item} />}
				/>
			</View>
		</ScreenLayout>
	);
}

const styles = StyleSheet.create({
	imgPosition: {
		position: "absolute",
		top: -100,
		right: -100,
	},
});
