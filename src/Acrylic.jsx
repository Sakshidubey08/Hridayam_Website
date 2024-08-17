// import React, { useState, useEffect } from 'react';
// import './Catalog.css';
// import Header from './Header';
// import { driver } from 'driver.js';
// import 'driver.js/dist/driver.css';
// import Footer from './Footer';
// import rect1 from './images/rect6.png'
// import rect2 from './images/RECTANGLE FEAME(1).jpg'
// import rect7 from './images/rect7.jpg'

// import square1 from './images/SQUARE FRAME.jpg'
// import oval from './images/oval.png'
// import bag from './images/bag.png'


// const svgBorderPaths = {
//     Normal: 'M 0,0 L 600,0 L 600,400 L 0,400 Z',
//     RoundEdge: 'M 30,0 H 570 A 30,30 0 0 1 600,30 V 370 A 30,30 0 0 1 570,400 H 30 A 30,30 0 0 1 0,370 V 30 A 30,30 0 0 1 30,0 Z',
//     Circle: 'M 300,200 m -150,0 a 150,150 0 1,0 300,0 a 150,150 0 1,0 -300,0',
//     Oval: 'M 300,200 m -200,0 a 200,100 0 1,0 400,0 a 200,100 0 1,0 -400,0',
//     Square: 'M 0,0 H 400 V 400 H 0 Z',
//     RoundEdgeSquare: 'M 30,0 H 370 A 30,30 0 0 1 400,30 V 370 A 30,30 0 0 1 370,400 H 30 A 30,30 0 0 1 0,370 V 30 A 30,30 0 0 1 30,0 Z'
// };
// const shapeImages = {
//     Normal: [rect1, rect2],
//     RoundEdge: ['round1.jpg', 'round2.jpg', 'round3.jpg', 'round4.jpg'],
//     Circle: ['circle2.jpg', 'circle3.jpg', 'circle4.jpg'],
//     Oval: [oval, 'oval2.jpg', 'oval3.jpg', 'oval4.jpg'],
//     Square: [square1, 'square2.jpg', 'square3.jpg', 'square4.jpg'],
//     RoundEdgeSquare: ['roundSquare1.jpg', 'roundSquare2.jpg', 'roundSquare3.jpg', 'roundSquare4.jpg'],
// };
// const imageStyle = {
//     width: '100px', // Set the desired width
//     height: '100px', // Set the desired height
//     objectFit: 'cover', // Maintain aspect ratio
//     margin: '10px', // Add some margin
// };
// function App() {
//     const [selectedShape, setSelectedShape] = useState('rectangle');
//     const [selectedThickness, setSelectedThickness] = useState(null);
//     const [borderColor, setBorderColor] = useState('black');
//     const [selectedImage, setSelectedImage] = useState('https://i.pinimg.com/736x/86/e0/62/86e0627f43de01aa0c71de63918c7777.jpg');
//     const [imageSelected, setImageSelected] = useState(false);
//     const [showTextInput, setShowTextInput] = useState(false);
//     const [text, setText] = useState('');
//     const [selectedSize, setSelectedSize] = useState(''); // Default size
//     useEffect(() => {
//         const driverObj = driver({
//             animate: false,
//             showProgress: false,
//             showButtons: ['next', 'previous', 'close'],
//             steps: [
//                 { element: '.header', popover: { title: 'Header', description: 'This is the header section.', side: "bottom", align: 'start' } },
//                 { element: '.image-preview', popover: { title: 'Image Preview', description: 'Here you can see the preview of your selected image.', side: "top", align: 'start' } },
//                 { element: '.shape-options', popover: { title: 'Shape Options', description: 'Select a shape for your acrylic photo.', side: "right", align: 'start' } },
//                 { element: '.size-options', popover: { title: 'Size Options', description: 'Choose the size of your acrylic photo.', side: "bottom", align: 'start' } },
//                 { element: '.thickness-options', popover: { title: 'Thickness Options', description: 'Select the thickness of the acrylic.', side: "top", align: 'start' } },
//                 { element: '.buy-button', popover: { title: 'Buy Now', description: 'Click here to purchase your acrylic photo.', side: "top", align: 'start' } },
//             ]
//         });

//         driverObj.drive();
//     }, []);
//     const [selectedImage2, setSelectedImage2] = useState(null);

//     // Event handler to set the selected image
//     const handleImageClick = (imageSrc) => {
//         setSelectedImage2(imageSrc);
//     };
//     const handleShapeClick = (shape) => {
//         setSelectedShape(shape);
//     };

//     const handleThicknessClick = (thickness) => {
//         setSelectedThickness(thickness);
//     };

//     const handleImageUpload = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setSelectedImage(reader.result);
//                 setImageSelected(true);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleIconClick = (color) => {
//         setBorderColor(color);
//     };
//     const handleTextClick = () => {
//         setShowTextInput(true);
//     };

//     const handleTextChange = (e) => {
//         setText(e.target.value);
//     };

//     const handleTextSubmit = (e) => {
//         e.preventDefault();
//         setShowTextInput(false);
//     };
//     const getSizeDimensions = (size) => {
//         const dimensions = {
//             '12x9': { width: 300, height: 300 },
//             '11x11': { width: 275, height: 275 },
//             '16x12': { width: 400, height: 300 },
//             '16x16': { width: 400, height: 400 },
//             '21x15': { width: 525, height: 375 },
//             '35x23': { width: 875, height: 575 },
//             '22x22': { width: 320, height: 320 }
//         };
//         return dimensions[size] || { width: 300, height: 225 };
//     };


//     const { width, height } = getSizeDimensions(selectedSize);

//     return (
//         <>
//             <Header />
//             <div className="container">
//                 <div className='home'>Home / Acrylic photo frame</div>
//                 <div className="header" id="tour-example">
//                     <h1 className='photo'>Acrylic Photo Borders</h1>
//                     <br />
//                     <div className="shape-content" style={{ marginTop: '20px' }}>
//                         {selectedShape === 'rectangle' && (
//                             <div className="rectangle-section mt-8" style={{ display: 'flex', gap: '10px' }}>
//                                 {/* Content for Rectangle Shape */}

//                                 <img src={rect1} style={{ height: '100px', width: '120px' }} onClick={() => handleImageClick(rect1)} />
//                                 <img src={rect7} style={{ height: '100px', width: '120px' }} onClick={() => handleImageClick(rect7)} />
//                             </div>
//                         )}

//                         {selectedShape === 'square' && (
//                             <div className="square-section">
//                                 {/* Content for Square Shape */}
//                                 <h2>Square Section</h2>
//                                 <p>Images or content related to Square.</p>
//                             </div>
//                         )}

//                         {selectedShape === 'circle' && (
//                             <div className="circle-section">
//                                 {/* Content for Circle Shape */}
//                                 <h2>Circle Section</h2>
//                                 <p>Images or content related to Circle.</p>
//                             </div>
//                         )}

//                         {selectedShape === 'oval' && (
//                             <div className="oval-section">
//                                 {/* Content for Oval Shape */}

//                                 <img src={oval} style={{ height: '100px', width: '120px' }} onClick={() => handleImageClick(oval)} />
//                             </div>
//                         )}
//                     </div>
//                     {/* <div className="user-icons">
//                         <div className="icon1 icon-black" onClick={() => handleIconClick('black')}><img src='https://i.pinimg.com/564x/0a/80/8d/0a808da17a977f59125e56a1c9a0ae13.jpg' /></div>
//                         <div className="icon1 icon-blue" onClick={() => handleIconClick('blue')}><img src='https://i.pinimg.com/564x/0a/80/8d/0a808da17a977f59125e56a1c9a0ae13.jpg' /></div>
//                         <div className="icon1 icon-yellow" onClick={() => handleIconClick('yellow')}><img src='https://i.pinimg.com/564x/0a/80/8d/0a808da17a977f59125e56a1c9a0ae13.jpg' /></div>
//                         <div className="icon1 icon-green" onClick={() => handleIconClick('green')}><img src='https://i.pinimg.com/564x/0a/80/8d/0a808da17a977f59125e56a1c9a0ae13.jpg' /></div>
//                         <div className="icon1 icon-red" onClick={() => handleIconClick('red')}><img src='https://i.pinimg.com/564x/0a/80/8d/0a808da17a977f59125e56a1c9a0ae13.jpg' /></div>
//                     </div> */}
//                 </div>

//                 {/* <div className="image-preview">
//                     <div className={`image-container ${selectedShape}`} style={{
//                         borderColor: borderColor,
//                         width: selectedShape === 'rectangle' ? '600px' : selectedShape === 'square' ? '400px' : `${width}px`,
//                         height: selectedShape === 'rectangle' ? '400px' : selectedShape === 'square' ? '400px' : `${height}px`,
//                         borderWidth: selectedThickness
//                     }}>

//                        {selectedImage2 ? (
//                     <>
//                         <img src={selectedImage2} alt="Selected" />
//                         {text && <div className="overlay-text">{text}</div>}
//                     </>
//                 ) : (
//                     <>
//                         <img src={selectedImage} alt="Default"/>

//                         {!imageSelected && <div className="preview-text">PREVIEW</div>}
//                         {imageSelected && <div className="overlay-text">{text}</div>}
//                     </>
//                 )}
//                         {!imageSelected && (
//                             <>
//                                 <img src={selectedImage} alt="Preview" />
//                                 <div className="preview-text">PREVIEW</div>
//                             </>
//                         )}
//                         {imageSelected && (
//                             <>
//                                 <img src={selectedImage} alt="Selected" />
//                                 {text && <div className="overlay-text">{text}</div>}
//                             </>
//                         )}
//                     </div>
//                 </div> */}
//                 <div className="image-preview">
//                     <div className={`image-container ${selectedShape}`} style={{
//                         position: 'relative',
//                         // borderColor: borderColor,
//                         // height: selectedShape === 'rectangle' ? '620px' : selectedShape === 'square' ? '620px' : `${height}px`,
//                         // width: selectedShape === 'rectangle' ? '430px' : selectedShape === 'square' ? '430px' : `${height}px`,
//                         // height: selectedShape === 'circle' ? '620px' : selectedShape === 'oval' ? '620px' : `${height}px`,
//                         // width: selectedShape === 'circle' ? '430px' : selectedShape === 'oval' ? '430px' : `${height}px`,
//                         // // height: selectedShape === 'square' ? '620px' : selectedShape === 'square' ? '560px' : `${height}px`,
//                         // // width: selectedShape === 'square' ? '430px' : selectedShape === 'square' ? '560px' : `${height}px`,
//                         // // height: selectedShape === 'circle' ? '620px' : selectedShape === 'circle' ? '560px' : `${height}px`,
//                         // // width: selectedShape === 'circle' ? '430px' : selectedShape === 'circle' ? '560px' : `${height}px`,
//                         // // height: selectedShape === 'oval' ? '620px' : selectedShape === 'oval' ? '560px' : `${height}px`,
//                         // // width: selectedShape === 'oval' ? '430px' : selectedShape === 'oval' ? '560px' : `${height}px`,
//                         height:
//             selectedShape === 'rectangle' || selectedShape === 'square'
//         ? '350px'
//         : selectedShape === 'circle' || selectedShape === 'oval'
//         ? '750px'
//         : `${height}px`,
//           width:
//       selectedShape === 'rectangle' || selectedShape === 'square'
//         ? '400px'
//         : selectedShape === 'circle' || selectedShape === 'oval'
//         ? '400px'
//         : `${width}px`,
//                     }}>
//                         {selectedImage2 && (
//                             <img
//                                 src={selectedImage2}
//                                 alt="Selected 2"
//                                 style={{
//                                     position: 'absolute',
//                                     top: 0,
//                                     left: 0,

//                                     zIndex: 1
//                                 }}
//                             />
//                         )}
//                         <img
//                             src={selectedImage}
//                             alt="Default"
//                             style={{
//                                 position: 'absolute',
//                                 top: '50%',
//                                 left: '50.5%',
//                                 width: '72%',
//                                 height: '36%',
//                                 zIndex: 2,
//                                 transform: 'translate(-50%, -50%)' // Centers the image horizontally and vertically
//                             }}
//                         />
//                         {!imageSelected && (
//                             <div className="preview-text" style={{
//                                 position: 'absolute',
//                                 top: '50%',
//                                 left: '50%',
//                                 transform: 'translate(-50%, -50%)',
//                                 color: '#fff',
//                                 zIndex: 3
//                             }}>
//                                 PREVIEW
//                             </div>
//                         )}
//                         {imageSelected && text && (
//                             <div className="overlay-text" style={{
//                                 position: 'absolute',
//                                 bottom: '10px',
//                                 right: '10px',
//                                 color: '#fff',
//                                 zIndex: 3
//                             }}>
//                                 {text}
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 <div className="options">
//                     <button className="option" onClick={() => document.getElementById('fileInput').click()}>
//                         Select Photo
//                     </button>
//                     <input
//                         type="file"
//                         id="fileInput"
//                         style={{ display: 'none' }}
//                         accept="image/*"
//                         onChange={handleImageUpload}
//                     />
//                     <button className="option" onClick={handleTextClick}>Text</button>
//                     {showTextInput && (
//                         <form onSubmit={handleTextSubmit} className="text-input-form">
//                             <input
//                                 type="text"
//                                 value={text}
//                                 onChange={handleTextChange}
//                                 placeholder="Enter your text"
//                                 className="text-input"
//                             />
//                             <button type="submit">Add Text</button>
//                         </form>
//                     )}
//                 </div>
//                 {/* <div className="acrylic">
//       <div className="option">
//         <p className="option-text">Change Background</p>
//       </div>
//       <div className="option">
//         <img src="https://img.icons8.com/color/48/000000/zoom-in.png" alt="Zoom" className="option-icon" />
//         <p className="option-text">Zoom</p>
//       </div>
//       <button className="option change-photo">
//         <img src="https://img.icons8.com/ios-glyphs/30/000000/upload.png" alt="Upload" className="option-icon" />
//         <p className="option-text">Change Photo</p>
//       </button>
//       <div className="option">
//         <img src="https://img.icons8.com/color/48/000000/edit-text.png" alt="Edit" className="option-icon" />
//         <p className="option-text">Text</p>
//       </div>
//       <div className="option">
//         <p className="option-text">How?</p>
//       </div>
//       <p className="terms">By uploading an image you agree to our Terms of Service.</p>
//     </div> */}

//                 <div className="shapes-container">
//                     <h2 className='acrylic'>Acrylic Photo Shapes</h2>
//                     <br />
//                     <br />

//                     <div className="shape-options" style={{ display: 'flex', justifyContent: 'space-around' }}>

//                         <svg
//                             viewBox="0 0 600 400"
//                             className={`shape-svg1 ${selectedShape === 'rectangle' ? 'selected' : ''}`}
//                             onClick={() => handleShapeClick('rectangle')}
//                         >
//                             <rect x="10" y="10" width="480" height="280" fill="#c1995d" stroke="black" strokeWidth="5" />
//                         </svg>


//                         <svg
//                             viewBox="0 0 400 400"
//                             className={`shape-svg2 ${selectedShape === 'square' ? 'selected' : ''}`}
//                             onClick={() => handleShapeClick('square')}
//                         >
//                             <rect x="10" y="10" width="280" height="280" fill="#c1995d" stroke="black" strokeWidth="5" />
//                         </svg>


//                         <svg
//                             viewBox="0 0 200 200"
//                             className={`shape-svg3 ${selectedShape === 'circle' ? 'selected' : ''}`}
//                             onClick={() => handleShapeClick('circle')}
//                             width="100"
//                         >
//                             <circle cx="100" cy="100" r="80" fill="#c1995d" stroke="gray" strokeWidth="5" />
//                         </svg>


//                         <svg
//                             viewBox="0 0 400 400"
//                             className={`shape-svg4 ${selectedShape === 'oval' ? 'selected' : ''}`}
//                             onClick={() => handleShapeClick('oval')}
//                         >
//                             <ellipse cx="200" cy="200" rx="200" ry="100" fill="#c1995d" stroke="black" strokeWidth="5" />
//                         </svg>
//                     </div>

//                     {/* <div className="shape-content" style={{ marginTop: '20px' }}>
//                         {selectedShape === 'rectangle' && (
//                             <div className="rectangle-section mt-8" style={{ display: 'flex', gap: '10px' }}>


//                                 <img src={rect1} style={{ height: '100px', width: '120px' }} onClick={() => handleImageClick(rect1)} />
//                                 <img src={rect1} style={{ height: '100px', width: '120px' }} />
//                             </div>
//                         )}

//                         {selectedShape === 'square' && (
//                             <div className="square-section">

//                                 <h2>Square Section</h2>
//                                 <p>Images or content related to Square.</p>
//                             </div>
//                         )}

//                         {selectedShape === 'circle' && (
//                             <div className="circle-section">

//                                 <h2>Circle Section</h2>
//                                 <p>Images or content related to Circle.</p>
//                             </div>
//                         )}

//                         {selectedShape === 'oval' && (
//                             <div className="oval-section">


//                                 <img src={bag} />
//                             </div>
//                         )}
//                     </div> */}
//                 </div>

//                 <br />
//                 <br /> <br />
//                 <div className="size-options">
//                     <h2 className='size'>Sizes</h2>
//                     {['12x9', '11x11', '16x16', '22x22'].map(size => (
//                         <button
//                             key={size}
//                             className={`size-button ${selectedSize === size ? 'selected' : ''}`}
//                             onClick={() => setSelectedSize(size)}
//                         >
//                             {size}
//                         </button>
//                     ))}
//                 </div>



//                 <div className="thickness-options">
//                     <h2 className='thickness'>Thickness</h2>
//                     {['5mm', '10mm', '15mm', '20mm'].map(thickness => (
//                         <button
//                             key={thickness}
//                             className={`thickness-button ${selectedThickness === thickness ? 'selected' : ''}`}
//                             onClick={() => handleThicknessClick(thickness)}
//                         >
//                             {thickness}
//                         </button>
//                     ))}
//                 </div>

//                 <button className="buy-button">Buy Now</button>
//             </div>
//             <Footer />
//         </>
//     );
// }

// export default App;
// import React, { useState } from 'react';
// import './Catalog.css'; // Import your CSS file
// import Header from './Header';
// import rect1 from './images/rect6.png'
// import PreviewImg from "./images/Preview.png"
// import circle1 from "./images/GOLDEN CIRCLE FRAME.jpg"
// import rect2 from './images/RECTANGLE FEAME(1).jpg'
// import rect7 from './images/rect7.jpg'
// import oval from './images/oval.png'
// import oval1 from './images/ovalgolden.jpg'
// import circle from './images/CIRCLE FRAME.jpg'
// import { AutoTextSize } from 'auto-text-size'
// function App() {
//     const [selectedImage3, setSelectedImage3] = useState(null);
//     const [selectedShape, setSelectedShape] = useState("rectangle");
//     const [selectedSize, setSelectedSize] = useState('12x9');
//     const [selectedThickness, setSelectedThickness] = useState('3MM');
//     const [selectedImage2, setSelectedImage2] = useState(null);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [scale, setScale] = useState(0.8);
//     //    const [selectedImage, setSelectedImage] = useState(false);
//         const [imageSelected, setImageSelected] = useState(false);
//             const [text, setText] = useState('');
//             const [showTextInput, setShowTextInput] = useState(false);

//             const handleSliderChange = (e) => {
//                 setScale(e.target.value / 100);
//                 console.log(scale)
//                  // Convert range value to scale factor (0.2 to 1.0)
//             };
//     const handleTextChange = (e) => {
//         setText(e.target.value);
//     };

//     const handleTextSubmit = (e) => {
//         e.preventDefault();
//         setShowTextInput(false);
//     };
//     const handleTextClick = () => {
//         setShowTextInput(true);
//     };
//     const handleImageClick = (image) => {
//         setSelectedImage(image);
//     };
//        const handleImageUpload = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setSelectedImage2(reader.result);
//                 setImageSelected(true);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleShapeChange = (shape) => {
//         setSelectedShape(shape);
//     };
//     const handleShapeClick = (shape) => {
//         setSelectedShape(shape);
//     };
//     const handleSizeChange = (size) => {
//         setSelectedSize(size);
//     };

//     const handleThicknessChange = (thickness) => {
//         setSelectedThickness(thickness);
//     };
//     const handleImageClick1 = (imageSrc) => {
//         setSelectedImage2(imageSrc);
//     };
//     return (
//         <>
//             <Header />
//             <h1 className='acrylic'>Acrylic Photo Borders</h1>
//             <div className="container">
                
//                 <div className="profile-pictures">
//                     <div className="shape-content" >
//                         {selectedShape === 'rectangle' && (
//                             <div className="rectangle-section mt-8" style={{ display: 'flex', gap: '10px' }}>

//                                 <img src={rect1} style={{ height: '60px', width: '60px' }} onClick={() => handleImageClick(rect1)} />
//                                 <img src={rect7} style={{ height: '60px', width: '60px' }} onClick={() => handleImageClick(rect7)} />
//                             </div>
//                         )}

//                         {selectedShape === 'square' && (
//                             <div className="square-section">

//                                 <h2>Square Section</h2>
//                                 <p>Images or content related to Square.</p>
//                             </div>
//                         )}

//                         {selectedShape === 'circle' && (
//                             <div className="circle-section">
//      <img src={circle} style={{ height: '60px', width: '60px', marginTop:'5px' }} onClick={() => handleImageClick(circle)} />
//      <img src={circle1} style={{ height: '60px', width: '60px', marginTop:'5px' }} onClick={() => handleImageClick(circle)} />

//                             </div>
//                         )}

//                         {selectedShape === 'oval' && (
//                             <div className="oval-section" style={{display:'flex'}}>


//                                 <img src={oval} style={{ height: '60px', width: '60px', marginTop:'5px' }} onClick={() => handleImageClick(oval)} />
//                                 <img src={oval1} style={{ height: '60px', width: '60px', marginTop:'5px' }} onClick={() => handleImageClick(oval1)} />

//                             </div>
//                         )}
//                     </div>
//                 </div>
//                 <div className="preview">

//                     <div className="image-container ">
//                     <div className={` ${ selectedImage==null?"block":"hidden"}`}>
                   
//                     <img  style={{zIndex:'0'}}  className=' z-0 top-0 h-20 w-20 ' src={selectedImage2} style={{transform:`scale(${scale})`}}  />
//                     <div className={ `relative ${selectedImage2==null?"block":"hidden"}`}>
//                         <img style={{transform:`scale(${scale})`}}
//                          className=' shadow-2xl'
//                           src={PreviewImg}></img>
//                         {/* <div  className=' text-3xl text-white  border px-3 py-4  bg-black/30 rounded-md  absolute top-[30%] left-[35%]'>PREVIEW</div> */}
//                     </div>
//                      </div>
//                     {selectedShape === 'rectangle' && selectedImage && (
//          <div className=' relative'>   
//          <img className=' h-20 w-20' style={{zIndex:"1"}} src={selectedImage} 
//          style={{
//       width: '100%', // Adjust width as needed
//       height: 'auto'
//       ,position:"relative" // Maintain aspect ratio
//     }}></img>       
//         <img width={"100px"} height={"600px"}  style={{zIndex:'2'}}  className=' absolute z-0 top-0 h-20 w-20 ' src={selectedImage2} style={{transform:`scale(${scale})`}}  ></img>
//         {/* <p className=' relative text-black top-0 left-0'>Text</p> */}
//         <div className=' absolute text-4xl top-[50%] left-[50%]' style={{zIndex:"3"}}>sdfd</div>
//          </div>
//     )}
//     {selectedShape === 'square' && selectedImage && (
//         <div className=' relative'>   
//          <img className='z-0' src={selectedImage}></img>       
//         <img   className=' absolute  top-0 h-20 w-20 ' src={selectedImage2} style={{transform:`scale(${scale})`}}  />
//          </div>
//     )}
//     {selectedShape === 'circle' && selectedImage && (
//         <div className=' relative'>   
//          <img className='z-0' src={selectedImage}></img>       
//         <img   className=' absolute  top-0 h-20 w-20 ' src={selectedImage2} style={{transform:`scale(${scale})`}}  />
//          </div>
//     )}
//     {selectedShape === 'oval' && selectedImage && (
//         <div className=' relative'>   
//          <img className='z-0' src={selectedImage}></img>       
//         <img   className=' absolute  top-0 h-20 w-20 ' src={selectedImage2} style={{transform:`scale(${scale})`}}  />
//          </div>
//     )}
//                     </div>
//                     {/* <div className="preview-text">
//                         <h2>PREVIEW</h2>
//                     </div> */}
//                 </div>
//                 <div className="options">
                   
                
//                     <div className="upload-button">
//                     <div>
                   
                  
                  
//                     <button className=" text-black relative" onClick={()=>document.getElementById('my_modal_3').showModal()}>
                    
//                     🔍 Zoom 
                
// </button>
// <dialog id="my_modal_3" className="modal">
//   <div className="modal-box">
//     <form method="dialog">
//       {/* if there is a button in form, it will close the modal */}
//       <button style={{ background:"transparent", color:"black"}} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-0 pb-20 m-20 pl-20">✕</button>
//     </form>
//     <input
//      type="range"
//       min="20"
//        max="100" 
//         className="range range-primary h-3"
//         value={scale * 100} // Convert scale factor back to percentage for the slider
//         onChange={handleSliderChange}
//          />
//   </div>
//   <form method="dialog" className="modal-backdrop">
//     <button style={{color:"transparent" ,background:"transparent"}}>close</button>
//   </form>
// </dialog>


//                     </div>
//                     <button className="option" onClick={() => document.getElementById('fileInput').click()}>
//                     🖼️   Select Photo
//                    </button>
                   
// <button className="" onClick={()=>document.getElementById('my_modal_4').showModal()}>
// 📝 Text
// </button>
// <dialog id="my_modal_4" className="modal">
//   <div className="modal-box">
//     <form method="dialog">
//       {/* if there is a button in form, it will close the modal */}
//       <button style={{background:"transparent", color:"black"}} className="btn  btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
//     </form>
//    <div className='border items-start'>
//     <label className=' content-start left-0'>Add Text</label><br></br>
//     <input type='text' placeholder='Enter Your Text here'/>
//    </div>
//   </div>
// </dialog>
//                    {/* {showTextInput && (
//                         <form onSubmit={handleTextSubmit} className="text-input-form">
//                             <input
//                                 type="text"
//                                 value={text}
//                                 onChange={handleTextChange}
//                                 placeholder="Enter your text"
//                                 className="text-input"
//                             />
//                             <button type="submit">Add Text</button>
//                         </form>
//                     )} */}
//                    <input
//                         type="file"
//                         id="fileInput"
//                         style={{ display: 'none' }}
//                         accept="image/*"
//                         onChange={handleImageUpload}
//                     />
//                     </div>
//                     <div className="shapes">
//                         <h3>Acrylic Photo Shapes</h3>
//                         <div className="shape-options">
//                             <svg
//                                 viewBox="0 0 600 400"
//                                 className={`shape-svg1 ${selectedShape === 'rectangle' ? 'selected' : ''}`}
//                                 onClick={() => handleShapeClick('rectangle')}
//                             >
//                                 <rect x="10" y="10" width="480" height="280" fill="#c1995d" stroke="black" strokeWidth="5" />
//                             </svg>


//                             <svg
//                                 viewBox="0 0 400 400"
//                                 className={`shape-svg2 ${selectedShape === 'square' ? 'selected' : ''}`}
//                                 onClick={() => handleShapeClick('square')}
//                             >
//                                 <rect x="10" y="10" width="280" height="280" fill="#c1995d" stroke="black" strokeWidth="5" />
//                             </svg>


//                             <svg
//                                 viewBox="0 0 200 200"
//                                 className={`shape-svg3 ${selectedShape === 'circle' ? 'selected' : ''}`}
//                                 onClick={() => handleShapeClick('circle')}
//                                 width="100"
//                             >
//                                 <circle cx="100" cy="100" r="80" fill="#c1995d" stroke="gray" strokeWidth="5" />
//                             </svg>


//                             <svg
//                                 viewBox="0 0 400 400"
//                                 className={`shape-svg4 ${selectedShape === 'oval' ? 'selected' : ''}`}
//                                 onClick={() => handleShapeClick('oval')}
//                             >
//                                 <ellipse cx="200" cy="200" rx="200" ry="100" fill="#c1995d" stroke="black" strokeWidth="5" />
//                             </svg>
//                         </div>
//                     </div>
//                     <div className="size-options">
//                         <br />
//                         <br />
//                         <h3>Size (Inch): {selectedSize}</h3>
//                         <div className="size-buttons">
//                             <button onClick={() => handleSizeChange('12x9')} className={`size-button ${selectedSize === '12x9' ? 'active' : ''}`}>12x9</button>
//                             <button onClick={() => handleSizeChange('11x11')} className={`size-button ${selectedSize === '11x11' ? 'active' : ''}`}>11x11</button>
//                             <button onClick={() => handleSizeChange('16x12')} className={`size-button ${selectedSize === '16x12' ? 'active' : ''}`}>16x12</button>
//                             <button onClick={() => handleSizeChange('16x16')} className={`size-button ${selectedSize === '16x16' ? 'active' : ''}`}>16x16</button>
//                             <button onClick={() => handleSizeChange('21x15')} className={`size-button ${selectedSize === '21x15' ? 'active' : ''}`}>21x15</button>
//                             <button onClick={() => handleSizeChange('35x23')} className={`size-button ${selectedSize === '35x23' ? 'active' : ''}`}>35x23</button>
//                         </div>
//                     </div>
//                     <div className="thickness-options">
//                         <h3>Thickness: {selectedThickness}</h3>
//                         <div className="thickness-buttons">
//                             <button onClick={() => handleThicknessChange('3MM')} className={`thickness-button ${selectedThickness === '3MM' ? 'active' : ''}`}>3MM</button>
//                             <button onClick={() => handleThicknessChange('5MM')} className={`thickness-button ${selectedThickness === '5MM' ? 'active' : ''}`}>5MM</button>
//                             <button onClick={() => handleThicknessChange('8MM')} className={`thickness-button ${selectedThickness === '8MM' ? 'active' : ''}`}>8MM (Premium)</button>
//                         </div>
//                     </div>
//                     <div className="price1">
//                         ₹699 ₹1,199
//                     </div>
//                     <div className="details">
//                         Only 8 Acrylic's left!
//                         Photo quality for 12x9 is Good
//                         Quick mount: OMGS® Adhesive hooks (Included)
//                     </div>
//                     <button className="buy-now">BUY IT NOW</button>
//                     <div className="size-guide">
//                         Size guide?
//                     </div>
//                     <div style={{ maxWidth: '60%', margin: '0 auto' }}>
//       <AutoTextSize>sdfsdfdsdfsdsdfsdsddsfsdfsddfsdf</AutoTextSize>
//     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default App;

