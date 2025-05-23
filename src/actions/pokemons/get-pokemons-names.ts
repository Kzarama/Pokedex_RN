import { pokeApi } from "@/src/config/api/pokeApi";
import { PokeAPIPaginatedResponse } from "@/src/infrastructure/interfaces/pokeapi.interfaces";

export const getPokemonsNames = async () => {
	const url = "/pokemon?limit=2000";
	const { data } = await pokeApi<PokeAPIPaginatedResponse>(url);
	return data.results.map(({ name, url }) => ({ id: url.split("/")[6], name }));
};
