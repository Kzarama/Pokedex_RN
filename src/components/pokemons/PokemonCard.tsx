import { Pokemon } from "@/src/domain/entities/pokemon";
import { Link } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { FadeInImage } from "../ui/FadeInImage";

interface IProps {
	pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: IProps) => {
	return (
		<Link style={[styles.cardLink, { backgroundColor: pokemon.color }]} href={{ pathname: "/[pokemon]", params: { pokemon: pokemon.id } }} asChild>
			<Card>
				<Text style={styles.name} variant="bodyLarge" lineBreakMode="middle">
					{pokemon.name}
					{`\n#${pokemon.id}`}
				</Text>

				<View style={styles.pokeballContainer}>
					<Image source={require("../../../assets/pokeball-light.png")} style={styles.pokeball} />
				</View>

				<FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />

				<Text style={[styles.name, { marginTop: pokemon.types[1] ? 20 : 38 }]}>{pokemon.types[0]}</Text>
				{pokemon.types[1] && <Text style={styles.name}>{pokemon.types[1] ?? pokemon.types[0]}</Text>}
			</Card>
		</Link>
	);
};

const styles = StyleSheet.create({
	cardLink: {
		marginHorizontal: 10,
		backgroundColor: "grey",
		height: 120,
		flex: 1,
		marginBottom: 25,
		borderRadius: 10,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},

	name: {
		color: "white",
		top: 10,
		left: 10,
		textShadowColor: "black",
		textShadowOffset: { width: 0, height: 0 },
		textShadowRadius: 8,
	},

	pokeball: {
		width: 100,
		height: 100,
		right: -25,
		top: -25,
		opacity: 0.4,
	},

	pokemonImage: {
		width: 120,
		height: 120,
		position: "absolute",
		right: -15,
		top: -30,
	},

	pokeballContainer: {
		alignItems: "flex-end",
		width: "100%",
		position: "absolute",
		overflow: "hidden",
		opacity: 0.5,
	},
});
