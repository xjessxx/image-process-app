import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ImageBlur from './pages/ImageBlur';
import EdgeDetection from './pages/EdgeDetection';
import ImageGreyscale from './pages/Greyscale';
import Sharpen from './pages/Sharpen';
import Sepia from './pages/Sepia';
import Posterize from './pages/Posterize';



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
          <Route path="/sharpen" element={<Sharpen />} />
          <Route path="/sepia" element={<Sepia />} />
          <Route path="/posterize" element={<Posterize />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;