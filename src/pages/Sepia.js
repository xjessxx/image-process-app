import React, { useState } from "react";
import "./ImageBlur.css"; 

function Sepia() {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => setOriginalImage(e.target.result);
    reader.readAsDataURL(file);
  };

  const applySepia = () => {
    if (!originalImage) return;

    const img = new Image();
    img.src = originalImage;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        data[i]     = Math.min(0.393 * r + 0.769 * g + 0.189 * b, 255);
        data[i + 1] = Math.min(0.349 * r + 0.686 * g + 0.168 * b, 255);
        data[i + 2] = Math.min(0.272 * r + 0.534 * g + 0.131 * b, 255);
      }

      ctx.putImageData(imgData, 0, 0);
      setProcessedImage(canvas.toDataURL());
    };
  };

  return (
    <div className="blur-page-container">
      <a href="/" className="back-button">← Back to Home</a>

      <h1 className="page-title">Sepia Tone Filter</h1>

      <div className="controls-container">
        <label className="upload-button">
          Choose Image
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>

        <button className="process-button" onClick={applySepia}>
          Apply Sepia
        </button>
      </div>

      <div className="image-display-wrapper">
        <div className="image-box">
          <h2>Original</h2>
          {originalImage ? (
            <img src={originalImage} alt="original" className="image-preview" />
          ) : (
            <div className="placeholder-box" />
          )}
        </div>

        <div className="image-box">
          <h2>Processed</h2>
          {processedImage ? (
            <img src={processedImage} alt="sepia" className="image-preview" />
          ) : (
            <div className="placeholder-box" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Sepia;
