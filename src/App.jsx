import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Index from './pages/Index';
import Detail from './pages/Detail';
import GameLandscape from './pages/GameLandscape';
import GameLevel from './pages/GameLevel';
import Skus from './pages/Skus';
import Tutorials from './pages/Tutorials';
import './styles.css';
import basename from '../react-config';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div>
      <Header/>

      <Router basename={basename}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/gamelandscape" element={<GameLandscape />} />
          <Route path="/gamelevel" element={<GameLevel />} />
          <Route path="/skus" element={<Skus />} />
          <Route path="/tutorials" element={<Tutorials />} /> 
          {/* Add a catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
