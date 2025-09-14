import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Country from './pages/Country';
import { ReactElement } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';

function App(): ReactElement {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:countryname" element={<Country />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
