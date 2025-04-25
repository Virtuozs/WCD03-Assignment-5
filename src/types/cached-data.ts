import { Pokemon } from "./pokemon";
import { PokemonDetail } from "./pokemon-detail";

export interface CachedPokemonData{
    data: Pokemon[];
    timestamp: number;
}

export interface CachedPokemonDetailData{
    data: PokemonDetail;
    timestamp: number;
}