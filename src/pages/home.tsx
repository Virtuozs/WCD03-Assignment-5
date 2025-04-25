import { useState, useMemo, useEffect } from "react";
import Container from "../components/common/container";
import ScrollToTopButton from "../components/common/scroll-to-top-button";
import PokemonGrid from "../components/home/pokemon-grid";
import { SortOrder } from "../config/global"; 
import { sortPokemons } from "../utils/sort";
import usePokemons from "../api/usePokemons";
import Header from "../components/home/header";
import ViewToggleMode from "../components/home/view-toggle-mode";
import { usePokemonFilter } from "../context/PokemonFilterContext";

const Home = () => {
  const { pokemons, loading } = usePokemons();
  const { filterType } = usePokemonFilter();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("id-asc");
  const [mobileViewMode, setMobileViewMode] = useState<"single" | "grid">("single");
  const [visibleCount, setVisibleCount] = useState(16);
  const pokemonsPerPage = 16;

  const handleSearch = (term: string) => {
    setSearchTerm(term.toLowerCase());
    setVisibleCount(pokemonsPerPage);
  };

  const handleSortChange = (order: SortOrder) => {
    setSortOrder(order);
  };

  const filtered = useMemo(() => {
    return pokemons.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm);
      const matchesType =
        filterType === "all" ||
        p.types.map((t) => t.toLowerCase()).includes(filterType);
      return matchesSearch && matchesType;
    });
  }, [pokemons, searchTerm, filterType]);
  
  const sorted = useMemo(() => {
    return sortPokemons(filtered, sortOrder);
  }, [filtered, sortOrder]);

  const visiblePokemons = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + pokemonsPerPage);
  };

  useEffect(() => {
    setVisibleCount(pokemonsPerPage);
  }, [searchTerm, sortOrder, filterType]);

  return (
    <div className="min-h-screen">
      <Header onSearch={handleSearch} onSortChange={handleSortChange}>
        <ViewToggleMode
          mobileViewMode={mobileViewMode}
          setMobileViewMode={setMobileViewMode}
        />
      </Header>

      <section className="p-4">
        <Container>
          <PokemonGrid
            loading={loading}
            pokemons={visiblePokemons}
            pokemonsPerPage={pokemonsPerPage}
            viewMode={mobileViewMode}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
          />
        </Container>
      </section>
      <ScrollToTopButton />
    </div>
  );
};

export default Home;
