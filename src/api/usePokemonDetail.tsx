import { useEffect, useState } from 'react';
import { PokemonDetail } from '../types/pokemon-detail';
import { CachedPokemonDetailData } from '../types/cached-data';
import { CACHE_EXPIRATION } from '../config/global';

const usePokemonDetailData = (nameOrId: string) => {
    const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    
    useEffect(() => {
      const controller = new AbortController();
      const signal = controller.signal;
      
      const STORAGE_KEY = `pokemon-detail-cache-${nameOrId}`;
      
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
        } catch (err: unknown) {
          if (err instanceof DOMException && err.name === "AbortError") {
            // Do nothing, fetch was aborted
          } else if (err instanceof Error) {
            console.error("Error fetching Pokémon detail:", err);
            setError(err.message || "Failed to fetch Pokémon detail.");
          } else {
            setError("Unknown error occurred.");
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
  
  
