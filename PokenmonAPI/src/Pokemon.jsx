import React, { useEffect, useState } from "react";
import "./index.css";

const Pokemon = () => {
  const [pokemonName, setPokemonName] = useState([]);
  const [pokemonImage, setPokemonImage] = useState("");
  const [search, setSearch] = useState("");


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

  //Search functionality

  const handleSearch = pokemonName.filter(value => value.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <section className="container">
      <header>
        <h1>Let's Catch Pokemon</h1>
      </header>
      <div className="pokemon-search">
        <input type="text" placeholder="Search Pokmon" value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div style={{ margin: "2rem" }}>
        <ul className="cards">
          {handleSearch.map((pokemon, idx) => {
            return (
              <li key={idx} className="pokemon-card">
                <figure>
                  <img className="pokemon-image" src={pokemon.sprites.front_default} alt={pokemon.name} />
                </figure>
                <h1 className="pokemon-name">{pokemon.name}</h1>
                <div className="pokemon-info pokemon-hightlight">
                  <p>
                    {
                      pokemon.types.map((type, inx) => type.type.name).join(", ")
                    }
                  </p>
                </div>
                <div className="grid-three-cols">
                  <p className="pokemon-info">
                    <span>Height:</span> {pokemon.height}
                  </p>
                  
                  <p className="pokemon-info">
                    <span>Weight:</span> {pokemon.weight}
                  </p>
                  <p className="pokemon-info">
                    <span>Speed:</span> {pokemon.stats[5].base_stat}
                  </p>
                  <p>
                    {pokemon.abilities.map(ability => ability.ability.name).splice(0, 1)}
                    
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Pokemon;
