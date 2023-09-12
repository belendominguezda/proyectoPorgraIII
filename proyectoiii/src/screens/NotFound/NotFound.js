// En tu archivo de configuración de rutas (por lo general, App.js o un archivo similar)
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          {/* Ruta para la página 404 */}
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
