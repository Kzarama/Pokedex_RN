import { getColorFromImage } from "@/src/config/helpers/get-color";
import { Pokemon } from "@/src/domain/entities/pokemon";
import { PokeApiPokemon } from "../interfaces/pokeapi.interfaces";

export const PokemonMapper = async (data: PokeApiPokemon): Promise<Pokemon> => {
	const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
	const sprites = getSprites(data);
	const color = (await getColorFromImage(avatar)) ?? "gray";

	return {
		id: data.id.toString(),
		name: data.name,
		avatar,
		sprites,
		types: data.types.map(({ type }) => type.name),
		color,
		games: data.game_indices.map(({ version }) => version.name),
		stats: data.stats.map(({ stat, base_stat }) => ({ name: stat.name, value: base_stat })),
		abilities: data.abilities.map(({ ability }) => ability?.name ?? ""),
		moves: data.moves.map((move) => ({ name: move.move.name, level: move.version_group_details[0].level_learned_at })).sort((a, b) => a.level - b.level),
	};
};

const getSprites = (data: PokeApiPokemon): string[] => {
	const sprites: string[] = [data.sprites.front_default, data.sprites.back_default, data.sprites.front_shiny, data.sprites.back_shiny];

	if (data.sprites.other?.home.front_default) sprites.push(data.sprites.other?.home.front_default);
	if (data.sprites.other?.["official-artwork"].front_default) sprites.push(data.sprites.other?.["official-artwork"].front_default);
	if (data.sprites.other?.["official-artwork"].front_shiny) sprites.push(data.sprites.other?.["official-artwork"].front_shiny);
	if (data.sprites.other?.showdown.front_default) sprites.push(data.sprites.other?.showdown.front_default);
	if (data.sprites.other?.showdown.back_default) sprites.push(data.sprites.other?.showdown.back_default);

	return sprites;
};
