import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';

import Home from './screens/Home/Home';
import DetalleCancion from './screens/DetalleCancion/DetalleCancion';
import Favoritos from './screens/Favoritos/Favoritos';
import VerTodasLasCanciones from './screens/VerTodasLasCanciones/VerTodasLasCanciones';
import ResultadoBusqueda from './components/ResultadosBusqueda/ResultadoBusqueda';

import './styles.css'
import VerTodosLosAlbums from './screens/VerTodosLosAlbums/VerTodosLosAlbums';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/cancion/:id" component={DetalleCancion} /> {/*Detalle cancion*/}
        <Route path="/album/:id" component={""} /> {/*Detalle album*/}
        <Route path="/favoritos" component={Favoritos} />
        <Route path="/ver-todas-las-canciones" component={VerTodasLasCanciones} /> {/*Ver todas las canciones*/}
        <Route path="/ver-todos-los-albums" component={VerTodosLosAlbums} /> {/*Ver todos los albums*/}
        <Route path="/resultado-busqueda/:busqueda" component={ResultadoBusqueda} />
        <Route component = {NotFound}/>
      </Switch>
    </BrowserRouter>
  );
}
export default App;