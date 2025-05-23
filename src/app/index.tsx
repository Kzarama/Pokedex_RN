import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { FAB, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getPokemons } from "../actions/pokemons/get-pokemons";
import ScreenLayout from "../components/Layouts/ScreenLayout";
import { PokemonCard } from "../components/pokemons/PokemonCard";
import { PokeballBg } from "../components/ui/PokeballBg";
import { globalTheme } from "../config/theme/global-theme";
import { useThemeContext } from "../context/ThemeContext";

export default function Home() {
	const { top } = useSafeAreaInsets();
	const { isDark, theme } = useThemeContext();
	const router = useRouter();
	const queryClient = useQueryClient();
	const { data, fetchNextPage } = useInfiniteQuery({
		queryKey: ["pokemons", "infinite"],
		initialPageParam: 0,
		staleTime: 1000 * 60 * 60,
		queryFn: async (params) => {
			const pokemons = await getPokemons(params.pageParam);
			pokemons.map((pokemon) => {
				queryClient.setQueryData(["pokemon", pokemon.id], pokemon);
			});
			return pokemons;
		},
		getNextPageParam: (_, pages) => pages.length,
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

				<FAB
					icon="magnify"
					style={[globalTheme.fab, { backgroundColor: theme.colors.primary }]}
					mode="elevated"
					color={isDark ? "white" : "black"}
					onPress={() => router.push("/search")}
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
