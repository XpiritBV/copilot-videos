import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Detail from './pages/Detail';
import GameLandscape from './pages/GameLandscape';
import GameLevel from './pages/GameLevel';
import Skus from './pages/Skus';
import Tutorials from './pages/Tutorials';
import './styles.css';

function App() {
  return (
    <Router basename={process.env.NODE_ENV === 'github-pages' ? '/copilot-videos' : '/'}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/copilot-videos" element={<Index />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/game-landscape" element={<GameLandscape />} />
        <Route path="/game-level" element={<GameLevel />} />
        <Route path="/skus" element={<Skus />} />
        <Route path="/tutorials" element={<Tutorials />} />
      </Routes>
    </Router>
  );
}

export default App;
