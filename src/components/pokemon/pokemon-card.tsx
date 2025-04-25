import { Link } from 'react-router-dom';
import { Pokemon } from '../../types/pokemon';
import { getTypeBadgeColor } from '../../utils/getTypeBadgeColor';

interface PokemonCardProps {
  pokemon: Pokemon & {
    sprites?: {
      other?: {
        ['official-artwork']?: {
          front_default?: string;
        };
      };
    };
  };
  viewMode?: 'single' | 'grid';
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, viewMode = 'single' }) => {
  const imageSrc =
    pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.image;

  const typeNames = pokemon.types;

  return (
    <Link to={`/pokemon/${pokemon.id}`} className="transition-transform transform hover:scale-105">
      <div
        className={`border rounded-xl shadow-md p-4 transition-all duration-500 ease-in-out
          ${viewMode === 'grid' ? 'text-center' : ''}
          ${viewMode === 'single' ? 'items-center text-center p-6' : ''}
          bg-white text-[#192038] border-none shadow-xl
          dark:bg-[#1B1F2F] dark:text-[#97A0CC] dark:border-[#DDE5F7]
        `}
      >
        <h2
            className={`font-bold capitalize ${
              viewMode === 'grid' ? 'text-l leading-tight' : ''
            } ${viewMode === 'single' ? 'text-2xl' : ''}`}
          >
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h2>
        <img
          src={imageSrc}
          alt={pokemon.name}
          className={`object-contain mx-auto my-3 shake ${
            viewMode === 'single' ? 'w-40 h-40 mb-4' : ''
          }`}
        />
        <div>
          <div
            className={`flex justify-center gap-1 mt-1 ${
              viewMode === 'single' ? 'mt-2 text-base' : ''
            }`}
          >
            {typeNames &&
              typeNames.map((typeName) => (
                <span
                    key={typeName}
                    className="text-xs font-bold px-3 py-2 rounded-full text-white shadow inline-block my-1 capitalize"
                    style={{ backgroundColor: getTypeBadgeColor(typeName) }}
                    >
                    {typeName}
                </span>
              ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
