import axios from "axios"
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
export default function Home() {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonData, setPokemonData] = useState(null);
  const handlechange = (e) => {
    setPokemon(e.target.value);
  };
  const handleClick = async () => {
    try {
      const datatosend = { pokemon: pokemon };
      const res = await axios.post('/api/pokemon', datatosend);
      setPokemonData(res.data);
      toast.success("jalo")
    } catch (error) {
      toast.error("no me diste el nombre de tu pokemon")
      console.log(error);
    }
  };
  console.log(pokemonData);
  return (
    <>
    <Toaster></Toaster>
    <h1 className="text-5xl font-bold text-blue-400">buscador pokemon  </h1>
    <input type="text" onChange={handlechange} className="border-2 border-black text-5xl" placeholder="dame tu pokemon"></input>
    <button onClick={handleClick} className="font-bold text-5xl border-2 bg-amber-200	 mt-[50px] ">buscar </button>
    {pokemonData && (
      <div>
        <img src={pokemonData.spriteDefault}></img>
        <h2>Name: {pokemonData.name}</h2>
        <h2>peso: {pokemonData.weight}</h2>
        <h2>stats base</h2>

        <h2>vida:  {pokemonData.hp} </h2>
        <h2>daño:  {pokemonData.atck} </h2>
        <h2>defensa:  {pokemonData.defense} </h2>
        <h2>ataque especial:  {pokemonData.specialatack} </h2>
        <h2>defensa especial:  {pokemonData.specialdefense} </h2>
        <h2>velocidad :  {pokemonData.speed} </h2>


      </div>
    )}
    </>
  )
}