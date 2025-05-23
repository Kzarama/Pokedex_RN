import { pokeApi } from "@/src/config/api/pokeApi";
import { Pokemon } from "@/src/domain/entities/pokemon";
import { PokemonMapper } from "@/src/infrastructure/mappers/pokemon.mapper";

export const getPokemonById = async (id: string): Promise<Pokemon> => {
	try {
		const { data } = await pokeApi(`/pokemon/${id}`);
		return PokemonMapper(data);
	} catch {
		throw new Error(`Error getting pokemon by id: ${id}`);
	}
};
