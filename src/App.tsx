import { Router } from '@reach/router'

import Home from './pages/Home'
import Country from './pages/Country'

function App() {
  return (
    <Router>
      <Home path='/' />
      <Country path='/:countryname' />
    </Router>
  );
}

export default App;
