import { useInfiniteQuery } from "@tanstack/react-query";
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
	const { data, isLoading, fetchNextPage } = useInfiniteQuery({
		queryKey: ["pokemons", "infinite"],
		initialPageParam: 0,
		queryFn: (params) => getPokemons(params.pageParam),
		getNextPageParam: (lastPage, pages) => pages.length,
		staleTime: 1000 * 60 * 60,
	});

	return (
		<ScreenLayout>
			<View style={globalTheme.globalMargin}>
				<PokeballBg style={styles.imgPosition} />
				<FlatList
					data={data?.pages.flat() ?? []}
					keyExtractor={({ id }, index) => `${id}-${index}`}
					numColumns={2}
					style={{ marginTop: top + 20 }}
					ListHeaderComponent={() => <Text variant="displayMedium">Pokedex</Text>}
					renderItem={({ item }) => <PokemonCard pokemon={item} />}
					onEndReachedThreshold={0.6}
					onEndReached={() => fetchNextPage()}
					showsVerticalScrollIndicator={false}
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
