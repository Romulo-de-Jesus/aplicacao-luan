import Logo from './logo.png';
import './App.css';
import ComponenteItem from './componente_item';

function App() {
  return (
    <div className="App">
      <header className='cabecalho'>
      <img className="classLogo" src={Logo} alt="logo da aplicação" />
        <h1> Lorem</h1>
       
      </header>
      <header className="App-header">
        <div className="caixaPrincipal">
          <h1>teste</h1>
          <input></input>
          <button>curtir</button>
        </div>


      </header>
      <ComponenteItem></ComponenteItem>
    </div>
  );
}

export default App;
