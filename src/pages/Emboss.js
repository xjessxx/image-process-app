import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Emboss.css";

export default function Emboss() {
    const navigate = useNavigate();

    const originalCanvasRef = useRef(null);
    const processedCanvasRef = useRef(null);

    const [imageSrc, setImageSrc] = useState(null);
    const [hasProcessed, setHasProcessed] = useState(false);
    const [detectionType, setDetectionType] = useState("top-left light");

    const MAX_W = 800;
    const MAX_H = 600;

    // ---------- Helpers ----------
    const drawImageToCanvas = (img, canvas) => {
        if (!canvas) return;
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

    const imageDataToGrayscale = (imageData) => {
        const { data, width, height } = imageData;
        const gray = new Float32Array(width * height);
        // Luminance (Rec. 601): 0.299 R + 0.587 G + 0.114 B
        for (let i = 0, j = 0; i < data.length; i += 4, j++) {
            gray[j] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        }
        return gray;
    };

    const grayscaleToImageData = (gray, width, height) => {
        const out = new ImageData(width, height);
        for (let i = 0, j = 0; j < gray.length; i += 4, j++) {
            const v = Math.max(0, Math.min(255, Math.round(gray[j])));
            out.data[i] = v;
            out.data[i + 1] = v;
            out.data[i + 2] = v;
            out.data[i + 3] = 255;
        }
        return out;
    };

    const convolve3x3 = (gray, width, height, kernel) => {
        const out = new Float32Array(width * height);
        const k = kernel;
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                const i = y * width + x;
                const v =
                    gray[i - width - 1] * k[0] +
                    gray[i - width] * k[1] +
                    gray[i - width + 1] * k[2] +
                    gray[i - 1] * k[3] +
                    gray[i] * k[4] +
                    gray[i + 1] * k[5] +
                    gray[i + width - 1] * k[6] +
                    gray[i + width] * k[7] +
                    gray[i + width + 1] * k[8];
                out[i] = v;
            }
        }
        return out;
    };

    // ---------- Actions ----------
    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            alert("Please choose an image file.");
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            setImageSrc(ev.target.result); // triggers draw via useEffect
            setHasProcessed(false);
        };
        reader.readAsDataURL(file);
    };

    const handleGo = () => {
        if (!imageSrc) {
            alert("Upload an image first.");
            return;
        }
        const srcCanvas = originalCanvasRef.current;
        const dstCanvas = processedCanvasRef.current;
        if (!srcCanvas || !dstCanvas) return;

        dstCanvas.width = srcCanvas.width;
        dstCanvas.height = srcCanvas.height;

        const sctx = srcCanvas.getContext("2d");
        const dctx = dstCanvas.getContext("2d");

        const srcData = sctx.getImageData(0, 0, srcCanvas.width, srcCanvas.height);
        const gray = imageDataToGrayscale(srcData);

        const width = srcCanvas.width;
        const height = srcCanvas.height;

        let embossed;
        switch (detectionType) {
            case "top-left light": {
                const kernel = [-2, -1, 0, -1, 1, 1, 0, 1, 2];
                embossed = convolve3x3(gray, width, height, kernel);
                break;
            }
            case "top-right light": {
                const kernel = [0, -1, -2, 1, 1, -1, 2, 1, 0];
                embossed = convolve3x3(gray, width, height, kernel);
                break;
            }
            case "bottom-left light": {
                const kernel = [0, 1, 2, -1, 1, 1, -2, -1, 0];
                embossed = convolve3x3(gray, width, height, kernel);
                break;
            }
            case "bottom-right light": {
                const kernel = [2, 1, 0, 1, 1, -1, 0, -1, -2];
                embossed = convolve3x3(gray, width, height, kernel);
                break;
            }
            default:
                embossed = gray.slice();
        }

        // Simple normalization to 0–255 based on current result range
        let maxVal = 0;
        for (let i = 0; i < embossed.length; i++) if (embossed[i] > maxVal) maxVal = embossed[i];
        const scale = maxVal > 0 ? 255 / maxVal : 1;
        for (let i = 0; i < embossed.length; i++) embossed[i] = embossed[i] * scale;

        const outData = grayscaleToImageData(embossed, width, height);
        dctx.putImageData(outData, 0, 0);
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
                a.download = "embossed-image.png";
                a.click();
                URL.revokeObjectURL(url);
            });
        } else {
            const url = canvas.toDataURL("image/png");
            const a = document.createElement("a");
            a.href = url;
            a.download = "embossed-image.png";
            a.click();
        }
    };

    // Draw original once imageSrc is set and canvases exist
    useEffect(() => {
        if (!imageSrc) return;
        const originalCanvas = originalCanvasRef.current;
        const processedCanvas = processedCanvasRef.current;
        if (!originalCanvas || !processedCanvas) return;

        const img = new Image();
        img.onload = () => {
            drawImageToCanvas(img, originalCanvas);
            // Reset processed canvas
            processedCanvas.width = originalCanvas.width;
            processedCanvas.height = originalCanvas.height;
            const pctx = processedCanvas.getContext("2d");
            pctx.clearRect(0, 0, processedCanvas.width, processedCanvas.height);
            setHasProcessed(false);
        };
        img.src = imageSrc;
    }, [imageSrc]);

    return (
        <div className="image-emboss-container">
            <header className="tool-header">
                <button className="back-button" onClick={() => navigate("/")}>
                    ← Back to Home
                </button>
                <h1>Emboss Tool</h1>
                <p>Pick a light source and create and engraved effect.</p>
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

                    <div className="emboss-controls">
                        <label htmlFor="emboss-type">Detection Method:</label>
                        <select
                            id="emboss-type"
                            value={detectionType}
                            onChange={(e) => setDetectionType(e.target.value)}
                        >
                            <option value="top-left light">top-left light</option>
                            <option value="top-right light">top-right light</option>
                            <option value="bottom-left light">bottom-left light</option>
                            <option value="bottom-right light">bottom-right light</option>
                        </select>
                        <button className="go-button" onClick={handleGo} disabled={!imageSrc}>
                            Go
                        </button>
                    </div>
                </div>

                {/* Canvases always mounted so refs aren’t null */}
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
                            Download Embossed Image
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
