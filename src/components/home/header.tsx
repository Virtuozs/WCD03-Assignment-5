import React, { useState, useEffect, ChangeEvent } from "react";
import { Search, Sun, Moon } from 'lucide-react';
import { usePokemonFilter } from "../../context/PokemonFilterContext";
import { useTheme } from "../../context/ThemeContext";
import { PokemonType, SortOrder } from "../../config/global";

const types: PokemonType[] = [
    "all",
    "fire",
    "water",
    "grass",
    "electric",
    "normal",
    "fighting",
    "psychic",
    "bug",
    "poison",
    "ground",
    "rock",
    "ghost",
    "ice",
    "dragon",
    "fairy",
    "dark",
    "steel",
    "flying",
  ];

interface HeaderProps {
  onSearch: (searchValue: string) => void;
  onSortChange: (sortValue: SortOrder) => void;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onSortChange, children }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [warning, setWarning] = useState('');
  const { filterType, setFilterType } = usePokemonFilter();

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const root = document.documentElement; 
    console.log('Current theme:', theme);  
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [theme]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length <= 12) {
      setSearchValue(value);
      onSearch(value);
      setWarning('');
    } else {
      setWarning("Oops! 12 letters max!");
    }
  };

  const isWideScreen = typeof window !== "undefined" && window.innerWidth >= 640;

  return (
    <header className="bg-white text-[#252A3E] dark:bg-[#252A3E] dark:text-white py-4 shadow-xl border-b-2 border-[#97A0CC]/35 dark:border-[#97A0CC]/35">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between w-full">
            <a href="/" className="transition-colors">
              <img
                src="/image/logo.svg"
                alt="Pokedex Logo"
                className="h-10 w-auto"
              />
            </a>
            <div className="flex items-center gap-2">
              <div className="sm:hidden relative">
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="text-[#252A3E] dark:text-white p-2 z-50 relative"
                >
                  <Search size={20} />
                </button>

                <div
                  className={`absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${
                    showSearch ? 'w-45 opacity-100 scale-100' : 'w-0 opacity-0 scale-95'
                  } overflow-hidden`}
                >
                  <input
                    type="text"
                    value={searchValue}
                    placeholder="Search Pokemon..."
                    onChange={handleSearchChange}
                    className={`px-2 py-2 w-full rounded-md bg-white text-[#252A3E] placeholder-[#97A0CC] border border-[#97A0CC] focus:outline-none focus:ring-2 focus:ring-[#97A0CC] transition-all dark:bg-[#3D4466] dark:text-white dark:placeholder-[#BCC2E0] dark:border-[#4F5784]`}
                  />
                </div>
              </div>

              <button
                onClick={toggleTheme}
                className="sm:hidden text-[#252A3E] dark:text-white hover:scale-110 transform transition"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          {(showSearch || isWideScreen) && (
            <div className="flex my-2 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 w-full sm:w-auto sm:ml-auto">
                    {warning && (
                      <span className="text-sm text-red-600 dark:text-red-400 shake self-center-safe">
                        ⚠️ {warning}
                      </span>
                    )}
              {isWideScreen && (<div className="relative flex flex-col w-full sm:w-auto">
                <input
                  type="text"
                  value={searchValue}
                  placeholder="Search Pokemon..."
                  onChange={handleSearchChange}
                  className="px-4 py-2 rounded-md bg-white text-[#252A3E] placeholder-[#97A0CC] border border-[#97A0CC] focus:outline-none focus:ring-2 focus:ring-[#97A0CC] transition-all dark:bg-[#3D4466] dark:text-white dark:placeholder-[#BCC2E0] dark:border-[#4F5784]"
                />
                <div className="h-[20px] mt-1 sm:absolute sm:top-full sm:left-0 sm:mt-1 sm:z-10">
                  {warning && (
                    <span className="text-sm text-red-600 dark:text-red-400 animate-shake">
                      ⚠️ {warning}
                    </span>
                  )}
                </div>
              </div>
              )}

              <div className="flex sm:hidden flex-row items-center gap-2 w-full">
                <div className="flex-2">
                  <select
                    onChange={(e) => onSortChange(e.target.value as SortOrder)}
                    className="px-4 py-2 rounded-md bg-white text-[#252A3E] border border-[#97A0CC] w-full sm:w-auto hover:bg-[#F0F2FA] hover:text-[#3D4466] focus:outline-none focus:ring-2 focus:ring-[#97A0CC] transition-all dark:bg-[#3D4466] dark:text-[#97A0CC] dark:border-[#4F5784] dark:hover:bg-[#4F5784] dark:hover:text-white"
                  >
                    <option value="id-asc">Ascending</option>
                    <option value="id-desc">Descending</option>
                    <option value="name-asc">A to Z</option>
                    <option value="name-desc">Z to A</option>
                  </select>
                </div>

                <div className="flex-1">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as PokemonType)}
                    className="px-4 py-2 rounded-md bg-white text-[#252A3E] border border-[#97A0CC] w-full sm:w-auto hover:bg-[#F0F2FA] hover:text-[#3D4466] focus:outline-none focus:ring-2 focus:ring-[#97A0CC] transition-all dark:bg-[#3D4466] dark:text-[#97A0CC] dark:border-[#4F5784] dark:hover:bg-[#4F5784] dark:hover:text-white"
                  >
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type[0].toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-1 rounded-md p-[1px] text-sm border transition-colors dark:bg-[#2F3655] dark:text-white dark:border-[#7885B0] sm:hidden">
                  {children}
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-4">
                <select
                  onChange={(e) => onSortChange(e.target.value as SortOrder)}
                  className="px-4 py-2 rounded-md bg-white text-[#252A3E] border border-[#97A0CC] w-full sm:w-auto hover:bg-[#F0F2FA] hover:text-[#3D4466] focus:outline-none focus:ring-2 focus:ring-[#97A0CC] transition-all dark:bg-[#3D4466] dark:text-[#97A0CC] dark:border-[#4F5784] dark:hover:bg-[#4F5784] dark:hover:text-white"
                >
                  <option value="id-asc">Ascending</option>
                  <option value="id-desc">Descending</option>
                  <option value="name-asc">A to Z</option>
                  <option value="name-desc">Z to A</option>
                </select>

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as PokemonType)}
                  className="px-4 py-2 rounded-md bg-white text-[#252A3E] border border-[#97A0CC] w-full sm:w-auto hover:bg-[#F0F2FA] hover:text-[#3D4466] focus:outline-none focus:ring-2 focus:ring-[#97A0CC] transition-all dark:bg-[#3D4466] dark:text-[#97A0CC] dark:border-[#4F5784] dark:hover:bg-[#4F5784] dark:hover:text-white"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type[0].toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-2">
                  <button onClick={toggleTheme} className="ml-2 text-[#252A3E] dark:text-white transition-colors">
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
