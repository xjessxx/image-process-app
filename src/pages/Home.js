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
              <img src="original.png" alt="Original" className="tool-card-image original" />
              <img src="blurred.png" alt="Blurred" className="tool-card-image processed" />
            </div>
          </div>

          <div className="tool-card" onClick={() => navigate('/greyscale')}>
            <h3 className="tool-name greyscale-effect audiowide-regular">Image Greyscale</h3>
            <p className="jersey-10-regular">Converts RGB pixel values<br /> to a weighted sum</p>
            <button className="tool-button audiowide-regular">Open Tool</button>
            <div className="tool-card-images">
              <img src="original.png" alt="Original" className="tool-card-image original" />
              <img src="blurred.png" alt="Blurred" className="tool-card-image processed" />
            </div>
          </div>

          <div className="tool-card" onClick={() => navigate('/sharpen')}>
            <h3 className="tool-name audiowide-regular">Sharpen Filter</h3>
            <p className="jersey-10-regular">Enhance edges and details<br /> using convolution</p>
            <button className="tool-button audiowide-regular">Open Tool</button>
            <div className="tool-card-images">
              <img src="original.png" alt="Original" className="tool-card-image original" />
              <img src="blurred.png" alt="Blurred" className="tool-card-image processed" />
            </div>
          </div>

          <div className="tool-card" onClick={() => navigate('/sepia')}>
            <h3 className="tool-name audiowide-regular">Sepia Filter</h3>
            <p className="jersey-10-regular">Apply a warm vintage film tone</p>
            <button className="tool-button audiowide-regular">Open Tool</button>
            <div className="tool-card-images">
              <img src="original.png" alt="Original" className="tool-card-image original" />
              <img src="blurred.png" alt="Blurred" className="tool-card-image processed" />
            </div>
          </div>

          <div className="tool-card" onClick={() => navigate('/posterize')}>
            <h3 className="tool-name audiowide-regular">Posterize Filter</h3>
            <p className="jersey-10-regular">Apply a fun filter to make your<br /> picture look like a cartoon</p>
            <button className="tool-button audiowide-regular">Open Tool</button>
            <div className="tool-card-images">
              <img src="original.png" alt="Original" className="tool-card-image original" />
              <img src="blurred.png" alt="Blurred" className="tool-card-image processed" />
            </div>
          </div>

          <div className="tool-card" onClick={() => navigate('/emboss')}>
            <h3 className="tool-name emboss-effect audiowide-regular">Emboss Filter</h3>
            <p className="jersey-10-regular">Emphasize the differences of <br />pixels in a given direction.</p>
            <button className="tool-button audiowide-regular">Open Tool</button>
            <div className="tool-card-images">
              <img src="original.png" alt="Original" className="tool-card-image original" />
              <img src="blurred.png" alt="Blurred" className="tool-card-image processed" />
            </div>
          </div>

          <div className="tool-card" onClick={() => navigate('/hueRotation')}>
            <h3 className="tool-name hue-rotation-effect-animated audiowide-regular">Hue Rotation Filter</h3>
            <p className="jersey-10-regular">Rotate the hue degree of any <br />picture.</p>
            <button className="tool-button audiowide-regular">Open Tool</button>
            <div className="tool-card-images">
              <img src="original.png" alt="Original" className="tool-card-image original" />
              <img src="blurred.png" alt="Blurred" className="tool-card-image processed" />
            </div>
          </div>


        </div>
      </section>

      <section className="education-section">
        <h2>Understanding Image Processing</h2>

        <div className="content-block">
          <h3>What is Image Processing?</h3>
          <p>
            Image processing is the manipulation and analysis of digital images using
            mathematical operations and algorithms. It involves transforming an input image
            into an output image with desired properties, such as enhanced contrast, reduced
            noise, detected edges, or applied artistic effects.
          </p>
          <p>
            Common applications include medical imaging (X-rays, MRIs), computer vision
            (self-driving cars, facial recognition), photography (filters, enhancement),
            and satellite imagery analysis.
          </p>
        </div>

        <div className="content-block">
          <h3>The Convolution Process</h3>
          <p>
            <strong>Convolution</strong> is one of the most fundamental operations in image
            processing. It involves applying a small matrix called a <strong>kernel</strong>
            (or filter) to an image to produce a transformed output.
          </p>

          <h4>How Convolution Works:</h4>
          <ol>
            <li>
              <strong>The Kernel:</strong> A small matrix (e.g., 3×3, 5×5) containing weights.
              Different kernels produce different effects (blur, sharpen, edge detection, etc.).
            </li>
            <li>
              <strong>Sliding Window:</strong> The kernel slides across the image, one pixel at a time,
              from left to right and top to bottom.
            </li>
            <li>
              <strong>Element-wise Multiplication:</strong> At each position, the kernel values are
              multiplied with the corresponding pixel values underneath it.
            </li>
            <li>
              <strong>Summation:</strong> All the multiplied values are summed to produce a single
              output pixel value.
            </li>
            <li>
              <strong>Normalization:</strong> The result may be normalized (divided by the sum of
              kernel weights) to maintain brightness.
            </li>
          </ol>

          <div className="formula-box">
            <p><strong>Mathematical Formula:</strong></p>
            <p className="formula">
              G(x,y) = Σ Σ K(i,j) · F(x+i, y+j)
            </p>
            <p className="formula-explanation">
              Where G is the output image, F is the input image, and K is the kernel
            </p>
          </div>
        </div>

        <div className="content-block">
          <h3>Types of Convolution</h3>

          <h4>1D Convolution</h4>
          <p>
            One-dimensional convolution operates on a single row or column of pixels at a time.
            It's commonly used for separable filters, which can be decomposed into two 1D operations
            (horizontal and vertical) for computational efficiency.
          </p>
          <p>
            <strong>Example:</strong> A horizontal edge detector might use a 1D kernel
            like [-1, 0, 1] applied vertically to detect horizontal edges.
          </p>

          <h4>2D Convolution</h4>
          <p>
            Two-dimensional convolution operates on a neighborhood of pixels in both dimensions
            simultaneously. This is the standard approach for most image processing operations.
          </p>
          <p>
            <strong>Example:</strong> A 3×3 Sobel kernel for edge detection:
          </p>
          <pre className="kernel-example">
            {`[-1  0  1]
[-2  0  2]
[-1  0  1]`}
          </pre>
        </div>

        <div className="content-block">
          <h3>Common Kernels</h3>

          <div className="kernels-grid">
            <div className="kernel-card">
              <h4>Blur (Box Filter)</h4>
              <pre>
                {`[1  1  1]
[1  1  1]  ÷ 9
[1  1  1]`}
              </pre>
              <p>Averages surrounding pixels for smoothing</p>
            </div>

            <div className="kernel-card">
              <h4>Gaussian Blur</h4>
              <pre>
                {`[1  2  1]
[2  4  2]  ÷ 16
[1  2  1]`}
              </pre>
              <p>Weighted averaging with center emphasis</p>
            </div>

            <div className="kernel-card">
              <h4>Edge Detection (Sobel X)</h4>
              <pre>
                {`[-1  0  1]
[-2  0  2]
[-1  0  1]`}
              </pre>
              <p>Detects vertical edges</p>
            </div>

            <div className="kernel-card">
              <h4>Sharpen</h4>
              <pre>
                {`[ 0 -1  0]
[-1  5 -1]
[ 0 -1  0]`}
              </pre>
              <p>Enhances edges and details</p>
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