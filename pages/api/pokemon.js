// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ error: "This request is not accepted" });
    return;
  }

  const body = req.body;
  const pokemon = body.pokemon;

  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  try {
    const response = await axios.get(url);
    const pokeInfo = response.data;

    const { order, stats, sprites } = pokeInfo;

    const pokeData = {
      name: pokemon,
      weight : pokeInfo.weight,
      spriteDefault: sprites.front_default,
      hp : stats[0].base_stat,
      atck : stats[1].base_stat,
      defense : stats[2].base_stat,
      specialatack : stats[3].base_stat,
      specialdefense : stats[4].base_stat,
      speed : stats[5].base_stat,

    };

    res.status(200).json(pokeData);
    console.log(pokeData);
  } catch (error) {
    console.log(error); 
    res.status(500).json({ error: error.message });
  }
}