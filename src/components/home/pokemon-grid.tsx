import React, { useRef, useCallback } from "react";
import PlaceholderCard from "../../components/pokemon/placeholder-card";
import PokemonCard from "../../components/pokemon/pokemon-card";
import { Pokemon } from "../../types/pokemon";
import { motion } from "framer-motion";

interface PokemonGridProps {
    loading: boolean;
    pokemons: Pokemon[];
    pokemonsPerPage: number;
    viewMode: "single" | "grid";
    onLoadMore: () => void; 
    hasMore: boolean;
  }

const PokemonGrid: React.FC<PokemonGridProps> = ({
    loading,
    pokemons,
    pokemonsPerPage,
    viewMode,
    onLoadMore,
    hasMore,
  }) => {
    const observerRef = useRef<IntersectionObserver | null>(null);
  
    const lastCardRef = useCallback(
      (node: HTMLDivElement | null) => {
        if (loading) return;
        if (observerRef.current) observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore) {
            onLoadMore();
          }
        });
        if (node) observerRef.current.observe(node);
      },
      [loading, hasMore, onLoadMore]
    );
  
    const gridClasses =
      viewMode === "single"
        ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";
  
    if (loading && pokemons.length === 0) {
      return (
        <>
          <div className="flex flex-col items-center justify-center h-32 gap-2">
            <img
              src="/image/pokeball.gif"
              alt="Loading Pokéball"
              className="h-12 w-12 animate-spin"
            />
            <span className="text-[#2e3a59] dark:text-[#DDE5F7] text-sm animate-pulse">
              Catching Pokémon...
            </span>
          </div>
          <main className={`grid gap-6 mt-4 ${gridClasses}`}>
            {Array.from({ length: pokemonsPerPage }).map((_, index) => (
              <PlaceholderCard key={index} />
            ))}
          </main>
        </>
      );
    }
  
    return (
      <main className={`grid gap-6 ${gridClasses}`}>
        {pokemons.map((pokemon, index) => {
          const isLast = index === pokemons.length - 1;
          return (
            <motion.div
              key={pokemon.id}
              ref={isLast ? lastCardRef : null}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
            >
              <PokemonCard pokemon={pokemon} viewMode={viewMode} />
            </motion.div>
          );
        })}
        {loading && (
          <>
            {Array.from({ length: pokemonsPerPage }).map((_, index) => (
              <PlaceholderCard key={`placeholder-${index}`} />
            ))}
          </>
        )}
      </main>
    );
  };
  
  export default PokemonGrid;

