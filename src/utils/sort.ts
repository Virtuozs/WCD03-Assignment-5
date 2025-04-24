import { Pokemon } from "../types/pokemon";
import { SortOrder } from "../config/global";

export const sortPokemons = (
  pokemons: Pokemon[],
  sortOrder: SortOrder
): Pokemon[] => {
  const sorted = [...pokemons];
  switch (sortOrder) {
    case "name-asc":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "id-desc":
      sorted.sort((a, b) => b.id - a.id);
      break;
    default:
      sorted.sort((a, b) => a.id - b.id);
  }
  return sorted;
};
