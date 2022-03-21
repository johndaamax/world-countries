import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Country from './pages/Country';
import { ReactElement } from 'react';

function App(): ReactElement {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:countryname" element={<Country />} />
      </Routes>
    </Router>
  );
}

export default App;
