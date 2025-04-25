import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import BackButton from "../components/pokemon/detail/back-button";
import PokemonDetailHeader from "../components/pokemon/detail/pokemon-detail-header";
import PokemonDetailImage from "../components/pokemon/detail/pokemon-detail-image";
import PokemonDetailInfo from "../components/pokemon/detail/pokemon-detail-info";
import usePokemonDetail from "../api/usePokemonDetail";

type RouteParams = Record<"id", string | undefined>;
  
const Detail: React.FC = () => {
    const { id } = useParams<RouteParams>();
    const { pokemon, loading } = usePokemonDetail(id ?? "");

    if (loading || !pokemon) {
        return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#252A3E]">
            <img src="/image/pikachu.gif" alt="Loading Pikachu" className="w-12 h-12 animate-spin" />
            <p className="text-sm text-[#DDE5F7] mt-2 animate-pulse">Catching Pokémon...</p>
        </div>
        );
    }

    const imageUrl = pokemon.sprites.other?.['official-artwork']?.front_default ?? pokemon.sprites.front_default;

    return (
        <div className="min-h-screen text-[#2e3a59] dark:text-white flex justify-center items-center px-4 overflow-x-hidden transition-colors duration-300 bg-[#F0F3FF] dark:bg-[#252A3E]">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full bg-white dark:bg-[#1B1F2F] rounded-2xl p-6 sm:p-14 shadow-xl shadow-[#00000020] dark:shadow-[#00000040]"
        >
            <BackButton />
            <PokemonDetailHeader id={pokemon.id} />
            <PokemonDetailImage
                imageUrl={imageUrl}
                name={pokemon.name}
                spriteUrl={pokemon.sprites.front_default}
            />
            <PokemonDetailInfo detail={pokemon} />
        </motion.div>
        </div>
    );
};
  
export default Detail;

