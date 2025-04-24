import React from "react";

interface DetailHeaderProps {
  id: number;
}

const PokemonDetailHeader: React.FC<DetailHeaderProps> = ({ id }) => (
  <div className="flex justify-between items-center my-2 -mb-10">
    <span className="text-[#8f9bb3] dark:text-[#97A0CC] text-xl">
      #{String(id).padStart(4, "0")}
    </span>
    <img src="/image/logo.svg" alt="Logo" className="w-24 h-auto" />
  </div>
);

export default PokemonDetailHeader;
