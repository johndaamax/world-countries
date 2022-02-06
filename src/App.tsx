import { Router } from '@reach/router';

import Home from './pages/Home';
import Country from './pages/Country';
import { ReactElement } from 'react';

function App(): ReactElement {
  return (
    <Router>
      <Home path="/" />
      <Country path="/:countryname" />
    </Router>
  );
}

export default App;
