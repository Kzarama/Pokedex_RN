import { pokeApi } from "@/src/config/api/pokeApi";
import type { Pokemon } from "@/src/domain/entities/pokemon";
import type { PokeAPIPaginatedResponse, PokeApiPokemon } from "@/src/infrastructure/interfaces/pokeapi.interfaces";
import { PokemonMapper } from "@/src/infrastructure/mappers/pokemon.mapper";

export const getPokemons = async (page: number, limit = 20): Promise<Pokemon[]> => {
	try {
		const url = "/pokemon";

		const { data } = await pokeApi<PokeAPIPaginatedResponse>(url, { params: { offset: page * limit, limit } });
		const pokemonPromises = data.results.map(({ url }) => pokeApi<PokeApiPokemon>(url));
		const pokeApiPokemons = await Promise.all(pokemonPromises);

		const pokemonsPromises = pokeApiPokemons.map(({ data }) => PokemonMapper(data));
		return await Promise.all(pokemonsPromises);
	} catch {
		throw new Error("Error getting pokemons");
	}
};
