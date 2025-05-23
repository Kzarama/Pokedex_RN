import { globalTheme } from "@/src/config/theme/global-theme";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getPokemonsByIds } from "../actions/pokemons/get-pokemons-by-ids";
import { getPokemonsNames } from "../actions/pokemons/get-pokemons-names";
import { PokemonCard } from "../components/pokemons/PokemonCard";
import { FullScreenLoader } from "../components/ui/FullScreenLoader";
import { useDebounceValue } from "../hooks/useDebounceValue";

export default function Search() {
	const { top } = useSafeAreaInsets();
	const [search, setSearch] = useState("");
	const debouncedValue = useDebounceValue(search);

	const { data: pokemonNames, isLoading } = useQuery({
		queryKey: ["pokemons", "all"],
		queryFn: getPokemonsNames,
		staleTime: 1000 * 60 * 60,
	});

	const pokemonNameId = useMemo(() => {
		if (!pokemonNames) return [];

		if (!isNaN(Number(debouncedValue))) {
			const pokemon = pokemonNames.find(({ id }) => id === String(debouncedValue));
			return pokemon ? [pokemon] : [];
		}

		if (debouncedValue.length < 3) {
			return [];
		}

		return pokemonNames.filter(({ name }) => name.toLowerCase().includes(debouncedValue.toLowerCase()));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedValue]);

	const { data: pokemons, isLoading: isLoadingPokemons } = useQuery({
		queryKey: ["pokemons", "by", pokemonNameId],
		queryFn: () => getPokemonsByIds(pokemonNameId.map(({ id }) => id)),
		staleTime: 1000 * 60 * 5,
	});

	if (isLoading) {
		return <FullScreenLoader />;
	}

	return (
		<View style={[globalTheme.globalMargin, { paddingTop: top + 20 }]}>
			<TextInput placeholder="Buscar Pokemon" mode="flat" autoFocus autoCorrect={false} onChangeText={setSearch} value={search} />

			{isLoadingPokemons ? (
				<ActivityIndicator style={{ marginTop: top + 20 }} />
			) : (
				<FlatList
					data={pokemons}
					keyExtractor={({ id }, index) => `${id}-${index}`}
					numColumns={2}
					style={{ marginTop: top + 20 }}
					renderItem={({ item }) => <PokemonCard pokemon={item} />}
					showsVerticalScrollIndicator={false}
					ListFooterComponent={<View style={{ height: 120 }} />}
				/>
			)}
		</View>
	);
}
