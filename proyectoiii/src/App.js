import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './screens/Home/Home';

import './styles.css'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/cancion/:id" component={""} />
        <Route path="/album/:id" component={""} />
        <Route path="/favoritos" component={""} />
        <Route path="/resultado-busqueda" component={""} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;