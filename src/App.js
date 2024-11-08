import Logo from './logo.png';
import './App.css';
import React, { useState, useEffect } from 'react';
import ComponenteItem from "./componente_item";
import axios from 'axios';
function App() {
  <div>
    </div>
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [token, setToken] = useState('');
  const [showResults, setShowResults] = useState(true);
  const [selectedTracks, setSelectedTracks] = useState([]); // Estado para as músicas selecionadas

  // API do Spotify
  const getToken = async () => {
    const client_id = '7f74855524534de2bf3740f12a99811a';
    const client_secret = '5575c24084cc438ab5cf22829968f668';

    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({ grant_type: 'client_credentials' }),
      {
        headers: {
          Authorization: `Basic ${btoa(client_id + ':' + client_secret)}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    setToken(response.data.access_token);
  };

  // Usando a API para procurar Músicas
  const searchTracks = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${query}&type=track&limit=4`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setResults(response.data.tracks.items);
    setShowResults(true); // Mostrar resultados
  };

  // Initialize token on mount
  useEffect(() => {
    getToken();
  }, []);

  // Function to handle track click and add to selected tracks
  const handleTrackClick = (track) => {
    setSelectedTracks((prevTracks) => [...prevTracks, track]); // Adiciona a música selecionada ao estado
    setShowResults(false); // Esconde os resultados
  };

  return (
    
    <div className="App">
      <header className='cabecalho'>
        <img className="classLogo" src={Logo} alt="logo da aplicação" />
        <h1>Songnest</h1>
      </header>
      <br />
      <header className="App-header">
        <div className="caixaPrincipal">
          <form onSubmit={searchTracks}>
            <h1>Adicione uma música à playlist</h1>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder=""
            />
            <button type="submit">Pesquisar</button>
          </form>
        </div>

        {showResults && (
          <div className="CaixaResultados">
            {results.map((track) => (
              <div
                onClick={() => handleTrackClick(track)} // Passa a track clicada
                className="CaixaMusica"
                key={track.id}
              >
                <br></br>

                <img src={track.album.images[0].url} alt={track.name} width="50" />
                <p >{track.name}</p>
                <p >{track.artists.map((artist) => artist.name).join(', ')}</p>

              </div>
            ))}
          </div>
        )}
      </header>
      <ul>
        {selectedTracks.map((track) => (
          <ComponenteItem key={track.id} nome={track.name} imagem={track.album.images[0].url} artista={track.artists[0].name} /> // Renderiza ComponenteItem para cada música selecionada
        ))}
      </ul>
    </div>
  );
}

export default App;
