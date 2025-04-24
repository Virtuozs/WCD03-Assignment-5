export interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
      front_default: string;
      other?: {
        ["official-artwork"]?: {
          front_default: string;
        };
      };
    };
    types: { slot: number; type: { name: string } }[];
    abilities: { ability: { name: string }; is_hidden: boolean }[];
  }
  