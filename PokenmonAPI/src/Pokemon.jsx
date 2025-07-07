import React, { useEffect, useState } from "react";
import "./index.css";

const Pokemon = () => {
  const [pokemonName, setPokemonName] = useState([]);
  const [pokemonImage, setPokemonImage] = useState("");

  const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=30";

  const fetchPokemonAPI = async () => {
    await fetch(apiUrl)
      .then((res) => {
        const data = res.json();
        return data;
      })
      .then((data) => {
        const result = data.results;
        // console.log(result);
        return result;
      })
      .then((results) => {
        results.map(async (pokemon, idx) => {
          const pokemonUrl = pokemon.url;
          await fetch(pokemonUrl)
            .then((res) => {
              const data = res.json();
              return data;
            })
            .then((data) => {
              // console.log(data)
              setPokemonName((prev) => {
                return [...prev, data];
              });
            });
        });
      });
  };

  useEffect(() => {
    fetchPokemonAPI();
  }, []);

  return (
    <section className="container">
      <header>
        <h1>Let's Catch Pokemon</h1>
      </header>
      <div style={{ margin: "2rem" }}>
        <ul className="cards">
          {pokemonName.map((pokemon, idx) => {
            return (
              <li key={idx} className="pokemon-card">
                <figure>
                  <img className="pokemon-image" src={pokemon.sprites.front_default} alt={pokemon.name} />
                  <h2>{pokemon.name}</h2>
                  <p>Height: {pokemon.height}</p>
                  <p>Weight: {pokemon.weight}</p>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Pokemon;
