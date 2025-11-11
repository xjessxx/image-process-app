import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ImageBlur from './pages/ImageBlur';
import EdgeDetection from './pages/EdgeDetection';
import ImageGreyscale from './pages/Greyscale';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blur" element={<ImageBlur />} />
          <Route path="/edge-detection" element={<EdgeDetection />} />
          <Route path="/greyscale" element={<ImageGreyscale />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;