import Logo from './logo.png';
import './App.css';
import React, { useState } from 'react';
import ComponenteItem from "./componente_item"
import axios from 'axios';


const CLIENT_ID = ""

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [token, setToken] = useState('');

  // Step 1: Retrieve token
  const getToken = async () => {
    const client_id = '7f74855524534de2bf3740f12a99811a'; // Your Spotify Client ID
    const client_secret = '5575c24084cc438ab5cf22829968f668'; // Your Spotify Client Secret

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

  // Step 2: Search for tracks
  const searchTracks = async (e) => {
    if (e != ""){
    e.preventDefault();

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${query}&type=track&limit=4`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setResults(response.data.tracks.items);
  }
  };

  // Initialize token on mount
  React.useEffect(() => {
    getToken();
  }, []);


  
  return (
    <div className="App">
      <header className='cabecalho'>
      <img className="classLogo" src={Logo} alt="logo da aplicação" />
        <h1> Lorem</h1>
       
      </header>
      <br></br>
      <br></br>
      <br></br>
      <header className="App-header">
        <div className="caixaPrincipal">
        <form onSubmit={searchTracks}>
          <h1>teste</h1>
          <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Procure uma música"/>
          <button type="submit">Procurar</button>
          </form>
        </div>

        <div className="CaixaResultados">

        {results.map((track) => (
          <div className="CaixaMusica" key={track.id}>
            <img src={track.album.images[0].url} alt={track.name} width="50" />
            <p>{track.name}</p>
            <p>{track.artists.map((artist) => artist.name).join(', ')}</p>
          </div>
        ))}

      </div>


      </header>
      <ComponenteItem></ComponenteItem>
    </div>
  );
}

export default App;
