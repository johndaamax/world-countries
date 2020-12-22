import { Router } from '@reach/router'

import Home from './pages/Home'
import Country from './pages/Country'

import './styles/test.scss';

function App() {
  // const [themeClass, setThemeClass] = useState(localStorage.getItem('theme') || 'dark');


  return (
    <Router>
      <Home path='/' />
      <Country path='/:countryname' />
    </Router>
  );
}

export default App;
