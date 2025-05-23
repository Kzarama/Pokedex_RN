import type { Pokemon } from "@/src/domain/entities/pokemon";
import { getPokemonById } from "./get-pokemon-by-id";

export const getPokemonsByIds = async (ids: string[]): Promise<Pokemon[]> => {
	try {
		const pokemonPromises: Promise<Pokemon>[] = ids.map((id) => getPokemonById(id));
		return Promise.all(pokemonPromises);
	} catch {
		throw new Error("Error getting pokemons by ids");
	}
};
