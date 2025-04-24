import { createContext, useContext, useState, ReactNode } from "react";
import { PokemonType } from "../config/global";


interface PokemonFilterContextType {
  filterType: PokemonType;
  setFilterType: (type: PokemonType) => void;
}

const PokemonFilterContext = createContext<PokemonFilterContextType | undefined>(undefined);

export const usePokemonFilter = (): PokemonFilterContextType => {
  const context = useContext(PokemonFilterContext);
  if (!context) {
    throw new Error("usePokemonFilter must be used within a PokemonFilterProvider");
  }
  return context;
};

interface PokemonFilterProviderProps {
  children: ReactNode;
}

export const PokemonFilterProvider: React.FC<PokemonFilterProviderProps> = ({ children }) => {
  const [filterType, setFilterType] = useState<PokemonType>("all");

  return (
    <PokemonFilterContext.Provider value={{ filterType, setFilterType }}>
      {children}
    </PokemonFilterContext.Provider>
  );
};
