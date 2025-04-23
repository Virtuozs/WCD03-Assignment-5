import { useEffect, useState } from 'react';
import { PokemonDetail } from '../types/pokemonDetail';
import { CachedPokemonDetailData } from '../types/cachedData';
import { CACHE_EXPIRATION } from '../config/global';

const usePokemonDetailData = (nameOrId: string) => {
    const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    const STORAGE_KEY = `pokemon-detail-cache-${nameOrId}`;
  
    useEffect(() => {
      const controller = new AbortController();
      const signal = controller.signal;
  
      const isCacheFresh = (timestamp: number): boolean => {
        return Date.now() - timestamp < CACHE_EXPIRATION;
      };
  
      const fetchPokemon = async () => {
        setLoading(true);
        setError(null);
  
        try {
          const cached = localStorage.getItem(STORAGE_KEY);
          if (cached) {
            const parsed: CachedPokemonDetailData = JSON.parse(cached);
            if (isCacheFresh(parsed.timestamp)) {
              setPokemon(parsed.data);
              setLoading(false);
              return;
            } else {
              localStorage.removeItem(STORAGE_KEY);
            }
          }
  
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`, { signal });
          const data: PokemonDetail = await res.json();
  
          const toCache: CachedPokemonDetailData = {
            data,
            timestamp: Date.now(),
          };
  
          localStorage.setItem(STORAGE_KEY, JSON.stringify(toCache));
          setPokemon(data);
        } catch (err: any) {
          if (err.name !== "AbortError") {
            console.error("Error fetching Pokémon detail:", err);
            setError("Failed to fetch Pokémon detail.");
          }
        } finally {
          setLoading(false);
        }
      };
  
      fetchPokemon();
  
      return () => {
        controller.abort(); 
      };
    }, [nameOrId]);
  
    return { pokemon, loading, error };
  };
  
  export default usePokemonDetailData;
  
  
