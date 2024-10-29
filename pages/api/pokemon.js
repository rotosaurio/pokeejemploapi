// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  const { pokemon } = req.body;

  if (!pokemon) {
    res.status(400).json({ error: "Se requiere el nombre del Pokémon" });
    return;
  }

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
    const pokeInfo = response.data;

    const pokeData = {
      name: pokeInfo.name,
      id: pokeInfo.id,
      weight: pokeInfo.weight,
      height: pokeInfo.height,
      spriteDefault: pokeInfo.sprites.front_default,
      spriteShiny: pokeInfo.sprites.front_shiny,
      spriteOfficial: pokeInfo.sprites.other['official-artwork'].front_default,
      hp: pokeInfo.stats[0].base_stat,
      atck: pokeInfo.stats[1].base_stat,
      defense: pokeInfo.stats[2].base_stat,
      specialatack: pokeInfo.stats[3].base_stat,
      specialdefense: pokeInfo.stats[4].base_stat,
      speed: pokeInfo.stats[5].base_stat,
      types: pokeInfo.types.map(type => type.type.name),
      abilities: pokeInfo.abilities.map(ability => ability.ability.name),
      baseExperience: pokeInfo.base_experience,
      moves: pokeInfo.moves.slice(0, 4).map(move => move.move.name)
    };

    res.status(200).json(pokeData);
  } catch (error) {
    res.status(404).json({ error: "Pokémon no encontrado" });
  }
}