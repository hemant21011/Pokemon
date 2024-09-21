import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [search, setSearch] = useState('');

  // Fetching 50 Pokémon data from the API
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const promises = [];
        for (let i = 1; i <= 50; i++) {
          promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
        }
        const results = await Promise.all(promises);
        const pokemonList = results.map((res) => ({
          name: res.data.name,
          image: res.data.sprites.front_default,
          id: res.data.id,
        }));
        setPokemonData(pokemonList);
        setFilteredPokemon(pokemonList);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  // Search filter logic
  const handleSearch = (e) => {
    setSearch(e.target.value);
    const searchQuery = e.target.value.toLowerCase();
    const filteredList = pokemonData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery)
    );
    setFilteredPokemon(filteredList);
  };

  return (
    <div className="app">
      <h1 className="title">Pokémon Gallery</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="pokemon-grid">
        {filteredPokemon.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
            <h2 className="pokemon-name">{pokemon.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
