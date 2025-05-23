import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { FlatList, Image, ScrollView, StyleSheet, View } from "react-native";
import { Chip, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getPokemonById } from "../actions/pokemons/get-pokemon-by-id";
import { FadeInImage } from "../components/ui/FadeInImage";
import { FullScreenLoader } from "../components/ui/FullScreenLoader";
import { Formatter } from "../config/helpers/formatter";
import { useThemeContext } from "../context/ThemeContext";

export default function Pokemon() {
	const { top } = useSafeAreaInsets();
	const { pokemon: pokemonId } = useLocalSearchParams<{ pokemon: string }>();
	const { isDark, theme } = useThemeContext();
	const pokeballImg = isDark ? require("../../assets/pokeball-light.png") : require("../../assets/pokeball-dark.png");

	const { data: pokemon, isLoading } = useQuery({
		queryKey: ["pokemon", pokemonId],
		queryFn: () => getPokemonById(pokemonId),
		staleTime: 1000 * 60 * 60,
	});

	if (isLoading || !pokemon) return <FullScreenLoader />;

	return (
		<ScrollView style={{ flex: 1, backgroundColor: pokemon.color }} bounces={false} showsVerticalScrollIndicator={false}>
			<View style={styles.headerContainer}>
				<Text
					style={{
						...styles.pokemonName,
						top: top + 5,
					}}
				>
					{`${Formatter(pokemon.name)}\n`}#{pokemon.id}
				</Text>

				<Image source={pokeballImg} style={styles.pokeball} />

				<FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />
			</View>

			<View style={{ flexDirection: "row", marginHorizontal: 10, marginTop: 10 }}>
				{pokemon.types.map((type) => (
					<Chip theme={theme} key={type} mode="outlined" style={{ marginLeft: 10 }}>
						{type}
					</Chip>
				))}
			</View>

			<FlatList
				data={pokemon.sprites}
				horizontal
				keyExtractor={(item) => item}
				showsHorizontalScrollIndicator={false}
				centerContent
				style={{
					marginTop: 20,
					height: 100,
				}}
				renderItem={({ item }) => <FadeInImage uri={item} style={{ width: 100, height: 100, marginHorizontal: 5 }} />}
			/>

			<Text style={styles.subTitle}>Abilities</Text>
			<FlatList
				data={pokemon.abilities}
				horizontal
				keyExtractor={(item) => item}
				style={{ paddingHorizontal: 10 }}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => <Chip style={{ marginHorizontal: 10 }}>{Formatter(item)}</Chip>}
			/>

			<Text style={styles.subTitle}>Stats</Text>
			<FlatList
				data={pokemon.stats}
				keyExtractor={(item) => item.name}
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (
					<View style={styles.statsContainer}>
						<Text style={{ flex: 1, color: "white" }}>{Formatter(item.name)}</Text>
						<Text style={{ color: "white" }}>{item.value}</Text>
					</View>
				)}
			/>

			<Text style={styles.subTitle}>Moves</Text>
			<FlatList
				data={pokemon.moves}
				horizontal
				showsHorizontalScrollIndicator={false}
				centerContent
				renderItem={({ item }) => (
					<View style={styles.statsContainer}>
						<Text style={{ flex: 1, color: "white" }}>{Formatter(item.name)}</Text>
						<Text style={{ color: "white" }}>lvl {item.level}</Text>
					</View>
				)}
			/>

			<Text style={styles.subTitle}>Games</Text>
			<FlatList
				data={pokemon.games}
				horizontal
				keyExtractor={(item) => item}
				style={{ paddingHorizontal: 10 }}
				showsHorizontalScrollIndicator={false}
				centerContent
				renderItem={({ item }) => <Chip style={{ marginHorizontal: 10 }}>{Formatter(item)}</Chip>}
			/>

			<View style={{ height: 100 }} />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	headerContainer: {
		height: 370,
		zIndex: 999,
		alignItems: "center",
		borderBottomRightRadius: 1000,
		borderBottomLeftRadius: 1000,
		backgroundColor: "rgba(0,0,0,0.2)",
	},
	pokemonName: {
		color: "white",
		fontSize: 40,
		alignSelf: "flex-start",
		left: 20,
	},
	pokeball: {
		width: 250,
		height: 250,
		bottom: -20,
		opacity: 0.7,
	},
	pokemonImage: {
		width: 240,
		height: 240,
		position: "absolute",
		bottom: -40,
	},
	loadingIndicator: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	subTitle: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
		marginHorizontal: 20,
		marginTop: 20,
		marginBottom: 5,
	},
	statsContainer: {
		flexDirection: "column",
		marginHorizontal: 20,
		alignItems: "center",
	},
});
