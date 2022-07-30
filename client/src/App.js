import './App.css';
import { Route, Switch } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import LandingPage from './components/LandingPage/LandingPage';
import PokemonDetail from './containers/PokemonDetail/PokemonDetail';
import CreatePokemon from './containers/CreatePokemon/CreatePokemon';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Home from './containers/Home/Home';
import PokemonByName from './containers/PokemonByName/PokemonByName';

function App() {
  return (
    <>
      <Route path="/(home|pokemonDetail|createPokemon)/" component={Nav} />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route path="/home/search/:name" component={PokemonByName} />
        <Route path="/pokemonDetail/:idPokemon" component={PokemonDetail} />
        <Route path="/createPokemon" component={CreatePokemon} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
