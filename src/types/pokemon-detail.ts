export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other?: {
      ['official-artwork']?: {
        front_default: string;
      };
    };
  };
  types: { slot: number; type: { name: string } }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
}