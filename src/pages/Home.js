import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      <header className="home-header">
        <h1 className="jersey-10-regular">Image Processing Tool</h1>
        <p className="subtitle jersey-10-regular">Explore the power of image convolution</p>
        <h2 className="jersey-10-regular">Select a Tool</h2>
      </header>

      <section className="tools-section">
        <div className="tools-grid">
          <div className="tool-card" onClick={() => navigate('/blur')}>
            <h3 className="tool-name blur-effect audiowide-regular">Image Blur</h3>
            <p className="jersey-10-regular">Apply Gaussian blur using <br />convolution kernels</p>
            <button className="tool-button audiowide-regular">Open Tool</button>
            <div className="tool-card-images">
              <img src="/blurredorignal.png" alt="Original" className="tool-card-image original" />
              <img src="/blurred-image.png" alt="Blurred" className="tool-card-image processed" />
            </div>
          </div>

          <div className="tool-card" onClick={() => navigate('/edge-detection')}>
            <h3 className="tool-name edge-effect audiowide-regular">Edge Detection</h3>
            <p className="jersey-10-regular">Detect edges using 1D or 2D<br /> convolution operators</p>
            <button className="tool-button audiowide-regular">Open Tool</button>
            <div className="tool-card-images">
              <img src="/edge-original.png" alt="Original" className="tool-card-image original" />
              <img src="/edge-detected-image.png" alt="Blurred" className="tool-card-image processed" />
            </div>
          </div>

          <div className="tool-card" onClick={() => navigate('/greyscale')}>
            <h3 className="tool-name greyscale-effect audiowide-regular">Image Greyscale</h3>
            <p className="jersey-10-regular">Converts RGB pixel values<br /> to a weighted sum</p>
            <button className="tool-button audiowide-regular">Open Tool</button>
            <div className="tool-card-images">
              <img src="/greyscale-original.png" alt="Original" className="tool-card-image original" />
              <img src="/greyscaled-image.png" alt="Blurred" className="tool-card-image processed" />
            </div>
          </div>

          <div className="tool-card" onClick={() => navigate('/sharpen')}>
            <h3 className="tool-name sharpen-effect audiowide-regular">Sharpen Filter</h3>
            <p className="jersey-10-regular">Enhance edges and details<br /> using convolution</p>
            <button className="tool-button audiowide-regular">Open Tool</button>
            <div className="tool-card-images">
              <img src="/sharpen-original.png" alt="Original" className="tool-card-image original" />
              <img src="/sharpen-image.png" alt="Blurred" className="tool-card-image processed" />
            </div>
          </div>

          <div className="tool-card" onClick={() => navigate('/sepia')}>
            <h3 className="tool-name sepia-effect audiowide-regular">Sepia Filter</h3>
            <p className="jersey-10-regular">Apply a warm vintage film tone</p>
            <button className="tool-button audiowide-regular">Open Tool</button>
            <div className="tool-card-images">
              <img src="/sepia-origninal.png" alt="Original" className="tool-card-image original" />
              <img src="/sepia-image.png" alt="Sepia" className="tool-card-image processed" />
            </div>
          </div>

          <div className="tool-card" onClick={() => navigate('/posterize')}>
            <h3 className="tool-name posterize-effect audiowide-regular">Posterize Filter</h3>
            <p className="jersey-10-regular">Apply a fun filter to make your<br /> picture look like a cartoon</p>
            <button className="tool-button audiowide-regular">Open Tool</button>
            <div className="tool-card-images">
              <img src="/posterize-original.png" alt="Original" className="tool-card-image original" />
              <img src="/posterized-image.png" alt="Blurred" className="tool-card-image processed" />
            </div>
          </div>

          <div className="tool-card" onClick={() => navigate('/emboss')}>
            <h3 className="tool-name emboss-effect audiowide-regular">Emboss Filter</h3>
            <p className="jersey-10-regular">Emphasize the differences of <br />pixels in a given direction.</p>
            <button className="tool-button audiowide-regular">Open Tool</button>
            <div className="tool-card-images">
              <img src="/embossed-original.png" alt="Original" className="tool-card-image original" />
              <img src="/embossed-image.png" alt="Blurred" className="tool-card-image processed" />
            </div>
          </div>

          <div className="tool-card" onClick={() => navigate('/hueRotation')}>
            <h3 className="tool-name hue-rotation-effect-animated audiowide-regular">Hue Rotation<br /> Filter</h3>
            <p className="jersey-10-regular">Rotate the hue degree of any <br />picture.</p>
            <button className="tool-button audiowide-regular">Open Tool</button>
            <div className="tool-card-images">
              <img src="/hue-original.png" alt="Original" className="tool-card-image original" />
              <img src="/hue-rotated-image.png" alt="Blurred" className="tool-card-image processed" />
            </div>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <p>Built with React - Demonstrating Convolution-Based Image Processing</p>
      </footer>
      
    </div>
  );
};

export default Home;