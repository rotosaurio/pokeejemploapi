// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ error: "This request is not accepted" });
    return;
  }


  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  try {
    const response = await axios.get(url);
    const pokeInfo = response.data;

    const { order, stats, sprites } = pokeInfo;

    const pokeData = {
      name: pokemon,
      weight : pokeInfo.weight,
      spriteDefault: sprites.front_default,
      
    };

    res.status(200).json(pokeData);
  } catch (error) {
    console.log(error); 
    res.status(500).json({ error: error.message });
  }
}