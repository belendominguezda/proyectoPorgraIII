import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';

import Home from './screens/Home/Home';
import DetalleCancion from './screens/DetalleCancion/DetalleCancion';
import DetalleAlbum from './screens/DetalleAlbum/DetalleAlbum';
import Favoritos from './screens/Favoritos/Favoritos';
import VerTodasLasCanciones from './screens/VerTodasLasCanciones/VerTodasLasCanciones';
import VerTodosLosAlbums from './screens/VerTodosLosAlbums/VerTodosLosAlbums';
import ResultadoBusqueda from './components/ResultadosBusqueda/ResultadoBusqueda';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/cancion/:id" component={DetalleCancion} /> {/*Detalle cancion*/}
        <Route path="/album/:id" component={DetalleAlbum} /> {/*Detalle album*/}
        <Route path="/favoritos" component={Favoritos} />
        <Route path="/ver-todas-las-canciones" component={VerTodasLasCanciones} /> {/*Ver todas las canciones*/}
        <Route path="/ver-todos-los-albumes" component={VerTodosLosAlbums} /> {/*Ver todos los albums*/}
        <Route path="/resultado-busqueda/:busqueda" component={ResultadoBusqueda} />
        <Route component = {NotFound}/>
      </Switch>
    </BrowserRouter>
  );
}
export default App;