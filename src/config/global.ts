export const CACHE_EXPIRATION = 1000 * 60 * 60 * 24;

export const API_BASE_URL = 'https://pokeapi.co/api/v2';

export type PokemonType =
  | "all"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "normal"
  | "fighting"
  | "psychic"
  | "bug"
  | "poison"
  | "ground"
  | "rock"
  | "ghost"
  | "ice"
  | "dragon"
  | "fairy"
  | "dark"
  | "steel"
  | "flying";

export type SortOrder = "id-asc" | "id-desc" | "name-asc" | "name-desc";