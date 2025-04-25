import React from "react";

interface PokemonDetailImageProps {
  imageUrl: string;
  name: string;
  spriteUrl: string;
}

const PokemonDetailImage: React.FC<PokemonDetailImageProps> = ({ imageUrl, name, spriteUrl }) => (
  <>
    <img
      src={imageUrl}
      alt={name}
      className="mt-8 w-full max-w-xs mx-auto"
    />
    <div className="relative">
      <h1 className="text-2xl sm:text-4xl font-bold capitalize pr-32 text-[#2e3a59] dark:text-[#F0F3FF]">
        {name}
      </h1>
      <img
        src={spriteUrl}
        alt={name}
        className="w-28 h-28 absolute top-0 right-0 -translate-y-8 translate-x-8"
      />
    </div>
  </>
);

export default PokemonDetailImage;
