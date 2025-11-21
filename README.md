# Image Processing App
**Access our hosted webpage here:** 

https://boisterous-cuchufli-d05088.netlify.app/

# Description
This is an interactive react application that allows users to upload an image and apply a variety of different basic filters to their images using Canvas and pixel manipulation. Each filter updates instantly and produces a downloadable photo, making the tool useful for someone getting into personal editing, as it also explains what each filter does and they can play around with different intesitity and settting options.

## Features
This web app allows users to apply the filters of


- **Image Blur:** Softens the image using pixel averaging

- **Edge Detection:** Highlights transitions for a sketched outlined look

- **Image Greyscale:** Removes all color for a black-and-white result

- **Sharpen Filter:** Enhances edges for a crisp, detailed look

- **Sepia Filter:** Applies a vintage warm-brown tone

- **Posterize Filter:** Reduces color depth for a stylized graphic effect

- **Emboss Filter:** Creates a raised/engraved relief effect

- **Hue Rotation Filter:** Shifts all colors around the hue spectrum


Each filter has adjustable input options and a download processed image button.

### Technologies & Dependencies
This project uses:
- React ^19.2.0
- JavaScript
- Canvas API 
- CSS
- Node.js + npm

dependencies:
  -testing-library/dom ^10.4.1
  -testing-library/jest-dom ^6.9.1
  -testing-library/react^16.3.0
  -testing-library/user-event ^13.5.0
  -react ^19.2.0
  -react-dom ^19.2.0
  -react-router-dom ^7.9.5
  -react-scripts ^5.0.1
  -web-vitals ^2.1.4

### Setup Instructions
git clone 
cd image-process-app
npm install
npm start

The app will run at:
http://localhost:3000

### File Structure
```
image-process-app/
├── public/
│   ├── index.html
│   └── (all image files for homepage display)
│
├── src/
│   ├── pages/
│   │   └── (a js and css page for each transformation tool)
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── index.js
│
├── package-lock.json
├── package.json
└── README.md
```

Each filter lives in its own JS & CSS file for isolated styling and clean separation 

## Aurthors
Jessica McIlree & Lily Farr (@lilcfar)
