import './App.css';
import { Route, Switch } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import LandingPage from './components/LandingPage/LandingPage';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Home from './containers/Home/Home';

function App() {
  return (
    <>
      <Route path="/(home|pokemon/:idPokemon|createPokemon)/" component={Nav} />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route path="/pokemon/:idPokemon" component={PokemonDetail} />
        <Route path="/createPokemon" component={CreatePokemon} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
