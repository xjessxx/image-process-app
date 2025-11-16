import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ImageBlur.css"; 

export default function Sepia() {
  const navigate = useNavigate();

  const originalCanvasRef = useRef(null);
  const processedCanvasRef = useRef(null);

  const [imageSrc, setImageSrc] = useState(null);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [blurPct, setBlurPct] = useState(50); // 1–100

  const MAX_W = 800;
  const MAX_H = 600;

  const drawImageToCanvas = (img, canvas) => {
    if (!canvas) return; // extra guard
    const ctx = canvas.getContext("2d");
    let { width, height } = img;
    const scale = Math.min(MAX_W / width, MAX_H / height, 1);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImageSrc(ev.target.result); // triggers useEffect below
      setHasProcessed(false);
    };
    reader.readAsDataURL(file);
  };

  const clampBlur = (n) => {
    if (Number.isNaN(n) || n < 1) return 1;
    if (n > 100) return 100;
    return n;
  };

  const handleBlurInput = (e) => {
    const v = clampBlur(parseInt(e.target.value, 10));
    setBlurPct(v);
  };

  const applySepia = () => {
    if (!imageSrc) {
    alert("Upload an image first.");
    return; }

    const src = originalCanvasRef.current;
    const dst = processedCanvasRef.current;
    if (!src || !dst) return;

    const sctx = src.getContext("2d");
    const dctx = dst.getContext("2d");

    dst.width = src.width;
    dst.height = src.height;

    // Read pixel data
    const imageData = sctx.getImageData(0, 0, src.width, src.height);
    const data = imageData.data;
    //const levels = Math.round(2 + ((100 - blurPct) / 100) * 62);

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      data[i] = Math.min(0.393 * r + 0.769 * g + 0.189 * b, 255);
      data[i + 1] = Math.min(0.349 * r + 0.686 * g + 0.168 * b, 255);
      data[i + 2] = Math.min(0.272 * r + 0.534 * g + 0.131 * b, 255);
    }
    dctx.putImageData(imageData, 0, 0);
    setHasProcessed(true);
    };

  const downloadProcessed = () => {
    const canvas = processedCanvasRef.current;
    if (!hasProcessed || !canvas) return;
    if (canvas.toBlob) {
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sepia-image.png";
        a.click();
        URL.revokeObjectURL(url);
      });
    } else {
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = "sepia-image.png";
      a.click();
    }
  };

  // When imageSrc changes AND canvases are mounted, draw original
  useEffect(() => {
    if (!imageSrc) return;
    const originalCanvas = originalCanvasRef.current;
    const processedCanvas = processedCanvasRef.current;
    if (!originalCanvas || !processedCanvas) return;
  
    const img = new Image();
    img.onload = () => {
      drawImageToCanvas(img, originalCanvas);
      // reset processed canvas size & clear
      processedCanvas.width = originalCanvas.width;
      processedCanvas.height = originalCanvas.height;
      const pctx = processedCanvas.getContext("2d");
      pctx.clearRect(0, 0, processedCanvas.width, processedCanvas.height);
      setHasProcessed(false);
    };
    img.src = imageSrc;
  }, [imageSrc]);


  return (
    <div className="image-blur-container">
      <header className="tool-header">
        <button className="back-button" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
        <h1>Image Sepia Tool</h1>
        <p>Upload an image, set sepia intensity (1–100), and process.</p>
      </header>

      <div className="tool-content">
        <div className="upload-controls">
          <label htmlFor="file-upload" className="custom-file-upload">
            Choose Image
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />

          <div className="blur-controls">
            <label htmlFor="blur-input">Sepia Intensity: {blurPct}%</label>
            <input
              id="blur-input"
              type="number"
              min="1"
              max="100"
              value={blurPct}
              onChange={handleBlurInput}
            />
            <button className="go-button" onClick={applySepia} disabled={!imageSrc}>
              Go
            </button>
          </div>
        </div>

        {/* Canvases are always mounted so refs aren’t null */}
        <div className="images-container">
          <div className="image-box">
            <h3>Original</h3>
            <canvas ref={originalCanvasRef} />
          </div>
          <div className="image-box">
            <h3>Processed</h3>
            <canvas ref={processedCanvasRef} />
            <button
              className="download-button"
              disabled={!hasProcessed}
              onClick={downloadProcessed}
            >
              Download Sepia Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./ImageBlur.css"; 

// export default function Sepia() {
//   const [originalImage, setOriginalImage] = useState(null);
//   const [processedImage, setProcessedImage] = useState(null);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (e) => setOriginalImage(e.target.result);
//     reader.readAsDataURL(file);
//   };

//   const applySepia = () => {
//     if (!originalImage) return;

//     const img = new Image();
//     img.src = originalImage;

//     img.onload = () => {
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");

//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.drawImage(img, 0, 0);

//       const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//       const data = imgData.data;

//       for (let i = 0; i < data.length; i += 4) {
//         let r = data[i];
//         let g = data[i + 1];
//         let b = data[i + 2];

//         data[i]     = Math.min(0.393 * r + 0.769 * g + 0.189 * b, 255);
//         data[i + 1] = Math.min(0.349 * r + 0.686 * g + 0.168 * b, 255);
//         data[i + 2] = Math.min(0.272 * r + 0.534 * g + 0.131 * b, 255);
//       }

//       ctx.putImageData(imgData, 0, 0);
//       setProcessedImage(canvas.toDataURL());
//     };
//   };

//   return (
//     <div className="image-blur-container">
//       <a href="/" className="back-button">← Back to Home</a>

//       <h1 className="page-title">Sepia Tone Filter</h1>

//       <div className="controls-container">
//         <label className="upload-button">
//           Choose Image
//           <input type="file" accept="image/*" onChange={handleImageUpload} />
//         </label>

//         <button className="process-button" onClick={applySepia}>
//           Apply Sepia
//         </button>
//       </div>

//       <div className="image-display-wrapper">
//         <div className="image-box">
//           <h2>Original</h2>
//           {originalImage ? (
//             <img src={originalImage} alt="original" className="image-preview" />
//           ) : (
//             <div className="placeholder-box" />
//           )}
//         </div>

//         <div className="image-box">
//           <h2>Processed</h2>
//           {processedImage ? (
//             <img src={processedImage} alt="sepia" className="image-preview" />
//           ) : (
//             <div className="placeholder-box" />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// } 
