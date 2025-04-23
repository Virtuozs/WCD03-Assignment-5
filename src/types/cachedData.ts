import { Pokemon } from "./pokemon";
import { PokemonDetail } from "./pokemonDetail";

export interface CachedPokemonData{
    data: Pokemon[];
    timestamp: number;
}

export interface CachedPokemonDetailData{
    data: PokemonDetail;
    timestamp: number;
}