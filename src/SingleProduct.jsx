import React, { useState } from 'react';
import './Single.css'
function ImageEditor() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [shape, setShape] = useState('square');
  const [style, setStyle] = useState('frame');
  const [zoom, setZoom] = useState(1);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleShapeChange = (e) => {
    setShape(e.target.value);
  };

  const handleStyleChange = (e) => {
    setStyle(e.target.value);
  };

  const handleZoomChange = (e) => {
    setZoom(e.target.value);
  };

  return (
    <div className="image-editor">
    <h1>Image Editor</h1>
    <div className="image-preview">
      {selectedImage && (
        <div
          style={{
            width: '300px',
            height: '300px',
            border: '1px solid black',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: `scale(${zoom})`,
          }}
        >
          <img
            src={selectedImage}
            alt="Selected Image"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          />
        </div>
      )}
      <div className="size-guide">
        <span>Height: 9 inch (22.86 cm)</span>
        <span>Width: 12 inch (30.48 cm)</span>
      </div>
      <div className="preview">PREVIEW</div>
    </div>
    <div className="controls">
      <div className="input-group">
        <label htmlFor="image-upload">Choose Image:</label>
        <input type="file" id="image-upload" accept="image/*" onChange={handleImageChange} />
        <button className="select-photo">Select Photo</button>
      </div>
      <div className="input-group">
        <label htmlFor="shape">Shape:</label>
        <select id="shape" value={shape} onChange={handleShapeChange}>
          <option value="square">Square</option>
          <option value="circle">Circle</option>
          <option value="rounded">Rounded</option>
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="style">Style:</label>
        <select id="style" value={style} onChange={handleStyleChange}>
          <option value="frame">Frame</option>
         
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="zoom">Zoom:</label>
          <input type="range" id="zoom" min="1" max="2" step="0.1" value={zoom} onChange={handleZoomChange} />
        </div>
      </div>
    </div>
  );
}

export default ImageEditor;