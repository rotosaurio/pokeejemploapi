import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

export default function Home() {
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };

  const handleClick = async () => {
    if (!pokemon) {
      toast.error("Por favor ingresa el nombre de un Pokémon");
      return;
    }
    
    setLoading(true);
    try {
      const res = await axios.post('/api/pokemon', { pokemon });
      setPokemonData(res.data);
      toast.success("¡Pokémon encontrado!");
    } catch (error) {
      toast.error("No se encontró el Pokémon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-500 to-red-600 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Toaster />
        <h1 className="text-6xl font-bold text-white text-center mb-8">Pokédex</h1>
        
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <div className="flex gap-4 mb-8">
            <input
              type="text"
              onChange={handleChange}
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg text-xl focus:outline-none focus:border-red-500"
              placeholder="Busca tu Pokémon..."
            />
            <button
              onClick={handleClick}
              disabled={loading}
              className="px-6 py-2 bg-red-500 text-white rounded-lg text-xl hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {loading ? "Buscando..." : "Buscar"}
            </button>
          </div>

          {pokemonData && (
            <div className="text-center">
              <div className="relative">
                <img 
                  src={pokemonData.spriteOfficial || pokemonData.spriteDefault} 
                  alt={pokemonData.name}
                  className="w-48 h-48 mx-auto mb-4"
                />
                <span className="absolute top-0 right-0 bg-gray-800 text-white px-3 py-1 rounded-full">
                  #{String(pokemonData.id).padStart(3, '0')}
                </span>
              </div>
              
              <h2 className="text-3xl font-bold capitalize mb-4">{pokemonData.name}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Información básica</h3>
                  <div className="space-y-2">
                    <p>Altura: {pokemonData.height/10} m</p>
                    <p>Peso: {pokemonData.weight/10} kg</p>
                    <p>Exp. Base: {pokemonData.baseExperience}</p>
                    <div className="mt-3">
                      <p className="font-medium mb-1">Tipos:</p>
                      <div className="flex gap-2">
                        {pokemonData.types?.map((type, index) => (
                          <span key={index} className="bg-red-500 text-white px-3 py-1 rounded-full text-sm capitalize">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="font-medium mb-1">Habilidades:</p>
                      <div className="flex flex-wrap gap-2">
                        {pokemonData.abilities?.map((ability, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm capitalize">
                            {ability.replace('-', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Movimientos principales</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {pokemonData.moves?.map((move, index) => (
                      <span key={index} className="bg-gray-200 px-2 py-1 rounded text-sm capitalize">
                        {move.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <p className="font-medium mb-2">Variantes:</p>
                    <div className="flex justify-center gap-4">
                      <div className="text-center">
                        <img 
                          src={pokemonData.spriteDefault} 
                          alt="Normal" 
                          className="w-16 h-16"
                        />
                        <p className="text-xs">Normal</p>
                      </div>
                      <div className="text-center">
                        <img 
                          src={pokemonData.spriteShiny} 
                          alt="Shiny" 
                          className="w-16 h-16"
                        />
                        <p className="text-xs">Shiny</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg md:col-span-2">
                  <h3 className="text-xl font-semibold mb-2">Estadísticas base</h3>
                  <div className="space-y-2">
                    <StatBar label="HP" value={pokemonData.hp} />
                    <StatBar label="Ataque" value={pokemonData.atck} />
                    <StatBar label="Defensa" value={pokemonData.defense} />
                    <StatBar label="Ataque Esp." value={pokemonData.specialatack} />
                    <StatBar label="Defensa Esp." value={pokemonData.specialdefense} />
                    <StatBar label="Velocidad" value={pokemonData.speed} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const StatBar = ({ label, value }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="font-medium">{label}</span>
      <span>{value}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-red-500 h-2.5 rounded-full"
        style={{ width: `${(value / 255) * 100}%` }}
      ></div>
    </div>
  </div>
);