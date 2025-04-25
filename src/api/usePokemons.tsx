import { useEffect, useState } from 'react';
import { Pokemon } from '../types/pokemon';
import { CachedPokemonData } from '../types/cached-data';
import { CACHE_EXPIRATION, API_BASE_URL} from '../config/global';

const POKEMON_LIMIT = 1000;
const STORAGE_KEY = `pokemon-cache-${POKEMON_LIMIT}`;
const BATCH_SIZE = 50;

const usePokemons = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const controller = new AbortController(); 
      const signal = controller.signal;
  
      const isCacheFresh = (timestamp: number): boolean => {
        return Date.now() - timestamp < CACHE_EXPIRATION;
      };
  
      const fetchInBatches = async (results: { name: string; url: string }[]): Promise<Pokemon[]> => {
        const fullDetails: Pokemon[] = [];
  
        for (let i = 0; i < results.length; i += BATCH_SIZE) {
          const batch = results.slice(i, i + BATCH_SIZE);
          const batchDetails = await Promise.all(
            batch.map(async (pokemon) => {
              const res = await fetch(pokemon.url, { signal });
              const detail = await res.json();
  
              return {
                id: detail.id,
                name: pokemon.name,
                url: pokemon.url,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detail.id}.png`,
                types: detail.types.map((t: { type: { name: string } }) => t.type.name),
              };
            })
          );
          fullDetails.push(...batchDetails);
        }
  
        return fullDetails;
      };
  
      const fetchPokemons = async () => {
        setLoading(true);
        setError(null);
  
        try {
          const cachedRaw = localStorage.getItem(STORAGE_KEY);
          if (cachedRaw) {
            const cached: CachedPokemonData = JSON.parse(cachedRaw);
            if (
              cached.data?.length === POKEMON_LIMIT &&
              isCacheFresh(cached.timestamp)
            ) {
              setPokemons(cached.data);
              setLoading(false);
              return;
            } else {
              localStorage.removeItem(STORAGE_KEY);
            }
          }
  
          const res = await fetch(
            `${API_BASE_URL}/pokemon?limit=${POKEMON_LIMIT}`,
            { signal }
          );
          const data = await res.json();
  
          const simplified = await fetchInBatches(data.results);
  
          const toCache: CachedPokemonData = {
            data: simplified,
            timestamp: Date.now(),
          };
  
          localStorage.setItem(STORAGE_KEY, JSON.stringify(toCache));
          setPokemons(simplified);
        } catch (err: unknown) {
          if (err instanceof DOMException && err.name === "AbortError") {
            console.log("Fetch aborted");
          } else if (err instanceof Error) {
            console.error("Error fetching Pokémon list:", err);
            setError(err.message || "Failed to fetch Pokémon.");
          } else {
            setError("Unknown error occurred.");
          }
        } finally {
          setLoading(false);
        }
      };
  
      fetchPokemons();
  
      return () => {
        controller.abort();
      };
    }, []);
  
    return { pokemons, loading, error };
  };
  
export default usePokemons;
  
  