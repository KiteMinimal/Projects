import React, { useEffect, useState } from "react";
import "./index.css"


const Pokemon = () => {

    const [pokemonName, setPokemonName] = useState("");
    const [pokemonImage, setPokemonImage] = useState("");

    const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=30";

    const fetchPokemonAPI = async () => {
        await fetch(apiUrl)
        .then(res => {
            const data = res.json();
            return data;    
        })
        .then(data => {
            const result = data.results;
            console.log(result);
            return result;
        })
        .then( (results) => {
            results.forEach(async (pokemon, idx) => {
                const pokemonUrl = pokemon.url;
                await fetch(pokemonUrl)
                .then((res) => {
                    const data = res.json()
                    return data;
                })
                .then((data) => {
                    // console.log(data)
                    
                })
            })
        })
    }

    useEffect(() => {
        fetchPokemonAPI();
    })
    return ( 
        <div>
            <h1>Welcome to the Pokenmon API</h1>
            <p>Explore the world of Pokenmon!</p>
        </div>
    )
}

export default Pokemon