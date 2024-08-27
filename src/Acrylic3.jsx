







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
//                             <div className="circle-section" style={{display:'flex', gap:'10px'}}>
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
//       {/* <AutoTextSize>sdfsdfdsdfsdsdfsdsddsfsdfsddfsdf</AutoTextSize> */}
//     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default App;
import React, { useState } from 'react';
import './Catalog.css'; // Import your CSS file
import Header from './Header';
import rect1 from './images/rect6.png'
import PreviewImg from "./images/Preview.png"
import circle1 from "./images/GOLDEN CIRCLE FRAME.jpg"
import square from './images/SQUARE FRAME.jpg'
import square1 from './images/GOLDEN SQUARE RAME.jpg'
import rect2 from './images/RECTANGLE FEAME(1).jpg'
import rect7 from './images/rect7.jpg'
import oval from './images/oval.png'
import oval1 from './images/OVALGold.png'
import { AutoTextSize } from 'auto-text-size'
import Draggable, { DraggableCore } from 'react-draggable';
import AvatarEditor from 'react-avatar-editor' // Both at the same time
// import Editor from './Editer';
import Tour from './Tour';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import backgroundImage from './images/Designer2.png';
import circle from './images/CIRCLE FRAME.jpg'
import { StyledEditorBlock, TextEditorBlock } from "react-web-editor"
function App() {
    const [selectedImage3, setSelectedImage3] = useState(null);
    const [selectedShape, setSelectedShape] = useState("rectangle");
    const [selectedSize, setSelectedSize] = useState('12x9');
    const [selectedThickness, setSelectedThickness] = useState('3MM');
    const [selectedImage2, setSelectedImage2] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [scale, setScale] = useState(0.8);
    const parentStyle = { width: 27, height: 20.5 };

    const [framtext, setFramText] = useState(''); // State for the text input
    const [color, setColor] = useState('#000000'); // State for the color input
    //    const [selectedImage, setSelectedImage] = useState(false);
    const [imageSelected, setImageSelected] = useState(false);
    const [text, setText] = useState('');
    const [showTextInput, setShowTextInput] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDraggable, setIsDraggable] = useState(false);
    const [framTextfontfamilystate, setframTextfontfamilystate] = useState("");
    const handleSliderChange = (e) => {
        setScale(e.target.value / 100);
        console.log(scale)
        // Convert range value to scale factor (0.2 to 1.0)
    };
    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleFocus = () => {
        setIsDraggable(true);
    };



    // Handle blur event to disable dragging
    const handleBlur = () => {
        setIsDraggable(false);
    };


    const handleTextSubmit = (e) => {
        e.preventDefault();
        setShowTextInput(false);
    };
    const handleTextClick = () => {
        setShowTextInput(true);
    };
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage2(reader.result);
                setImageSelected(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrag = (e, data) => {
        setPosition({ x: data.x, y: data.y });
    };
    const handleShapeChange = (shape) => {
        setSelectedShape(shape);
    };
    const handleShapeClick = (shape) => {
        setSelectedShape(shape);
    };
    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    const handleThicknessChange = (thickness) => {
        setSelectedThickness(thickness);
    };
    const handleImageClick1 = (imageSrc) => {
        setSelectedImage2(imageSrc);
    };
    const [price, setPrice] = useState(699);

    const sizePriceMap = {
        '12x9': 699,
        '11x11': 799,
        '16x12': 899,
        '16x16': 999,
        '21x15': 1199,
        '35x23': 1499,
    };

    const handleSizeChange1 = (size) => {
        setSelectedSize(size);
        setPrice(sizePriceMap[size]);
    };

    const framTextfontfamily = ["Permanent Marker", "Grey Qo", "Matemasie", "Edu VIC WA NT Beginner", "Bodoni Moda SC"];
    return (
        <>
            <Header />
            <Tour />
            <div className="container ml-1 mt-24 md:mt-10">
                <div style={{
                    backgroundSize: 'cover', // or 'contain' depending on your requirement
                    backgroundPosition: 'center', // centers the image
                    backgroundRepeat: 'no-repeat', // prevents the image from repeating
                }}>
                    <h1 className='acrylic'>Acrylic Photo Borders</h1>

                    <div className="profile-pictures">
                        <div className="shape-content ">
                            {selectedShape === 'rectangle' && (
                                <div className="rectangle-section gap-1 md:gap-6 mt-4" style={{ display: 'flex' }}>

                                    <img src={rect1} style={{ height: '60px', width: '60px' }} onClick={() => handleImageClick(rect1)} />
                                    <img src={rect7} style={{ height: '60px', width: '60px' }} onClick={() => handleImageClick(rect7)} />
                                    <img src={rect1} style={{ height: '60px', width: '60px' }} onClick={() => handleImageClick(rect1)} />
                                    <img src={rect7} style={{ height: '60px', width: '60px' }} onClick={() => handleImageClick(rect7)} />
                                    <img src={rect1} style={{ height: '60px', width: '60px' }} onClick={() => handleImageClick(rect1)} />
                                    <img src={rect7} style={{ height: '60px', width: '60px' }} onClick={() => handleImageClick(rect7)} />
                                </div>
                            )}

                            {selectedShape === 'square' && (
                                <div className="square-section" style={{ display: 'flex' }}>
                                    <img src={square} style={{ height: '60px', width: '60px', marginTop: '5px' }} onClick={() => handleImageClick(square)} />
                                    <img src={square1} style={{ height: '60px', width: '60px', marginTop: '5px' }} onClick={() => handleImageClick(square1)} />

                                </div>
                            )}

                            {selectedShape === 'circle' && (
                                <div className="circle-section" style={{ display: 'flex', gap: '10px' }}>

                                    <img src={circle} style={{ height: '60px', width: '60px', marginTop: '5px' }} onClick={() => handleImageClick(circle)} />
                                    <img src={circle1} style={{ height: '60px', width: '60px', marginTop: '5px' }} onClick={() => handleImageClick(circle1)} />

                                </div>
                            )}

                            {selectedShape === 'oval' && (
                                <div className="oval-section" style={{ display: 'flex' }}>

                                    <img src={oval} style={{ height: '60px', width: '60px', marginTop: '5px' }} onClick={() => handleImageClick(oval)} />
                                    <img src={oval1} style={{ height: '60px', width: '60px', marginTop: '5px' }} onClick={() => handleImageClick(oval1)} />


                                </div>
                            )}
                        </div>
                    </div>
                    <div className=' w-screen m-auto  md:w-[1140px] ' style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        overflow: "hidden",
                        backgroundRepeat: 'no-repeat',
                    }}>
                        <div className="preview">

                            <div className="image-container">
                                <div className={` ${selectedImage == null ? "block" : "hidden"}`}>

                                    <img style={{ zIndex: '0' }} className=' z-0 top-0 h-20 w-20 ' src={selectedImage2} style={{ transform: `scale(${scale})` }} />

                                    <div onMouseOver={() => { handleFocus() }}
                                        onMouseOut={handleBlur} className={`relative ${selectedImage2 == null ? "block" : "hidden"}`}>
                                        {isDraggable ? (
                                            <Draggable
                                                position={position}
                                                onDrag={handleDrag}
                                            >
                                                <img
                                                    style={{ transform: `scale(${scale})` }}
                                                    className={`shadow-2xl cursor-move ${selectedShape === 'oval' ? 'rounded-[80%]' : ''} ${selectedShape === 'roundedSquare' ? 'rounded-[15%]' : ''} ${selectedShape === 'roundedRectangle' ? 'rounded-[10%]' : ''} ${selectedShape === 'circle'?"rounded-[50%]":""} `}
                                                    src={PreviewImg}
                                                    alt="Draggable"
                                                />
                                            </Draggable>
                                        ) : (
                                            <img
                                                style={{
                                                    transform: `scale(${scale})`, position: " relative",  // Positioning to match draggable
                                                    left: `${position.x}`,
                                                    top: `${position.y}`,
                                                }}
                                                className={`shadow-2xl  ${selectedShape === 'oval' ? 'rounded-[80%]' : ''} ${selectedShape === 'roundedSquare' ? 'rounded-[15%]' : ''} ${selectedShape === 'roundedRectangle' ? 'rounded-[10%]' : ''} ${selectedShape === 'circle'?"rounded-[50%]":""} `}
                                                src={PreviewImg}
                                                alt="Not Draggable"
                                            />
                                        )}
                                        <Draggable
                                            defaultPosition={{ x: -76, y: -44 }}
                                        // onDrag={handleDrag}


                                        >
                                            <div className=' absolute text-4xl cursor-move hover:border top-[50%] left-[50%]' style={{ zIndex: "3", color: `${color}`, fontFamily: `${framTextfontfamilystate}` }}>{framtext}</div>
                                        </Draggable>
                                        {/* <div  className=' text-3xl text-white  border px-3 py-4  bg-black/30 rounded-md  absolute top-[30%] left-[35%]'>PREVIEW</div> */}

                                    </div>
                                </div>
                                {selectedShape === 'rectangle' && selectedImage && (
                                    <div className=' relative'>
                                        <img className=' h-20 w-20' style={{ zIndex: "1" }} src={selectedImage}
                                            style={{
                                                width: '100%', // Adjust width as needed
                                                height: 'auto'
                                                , position: "relative",
                                                // Maintain aspect ratio
                                            }}></img>
                                        {isDraggable ? (
                                            <Draggable
                                                position={position}
                                                onDrag={handleDrag}
                                            >

                                                <img onMouseOver={() => { handleFocus() }}
                                                    onMouseOut={handleBlur} width={"100px"} height={"600px"} style={{ zIndex: '2' }} className=' absolute z-0 p-10 cursor-move top-0 h-20 w-20 ' src={selectedImage2} style={{ transform: `scale(${scale})` }}  ></img>
                                            </Draggable>
                                        )
                                            : (
                                                <img onMouseOver={() => { handleFocus() }}
                                                    onMouseOut={handleBlur} width={"100px"} height={"600px"} style={{ zIndex: '2' }} className=' absolute p cursor-move z-0 top-0 h-20 w-20 ' src={selectedImage2} style={{ transform: `scale(${scale})` }}  ></img>

                                            )
                                        }
                                        {/* <p className=' relative text-black top-0 left-0'>Text</p> */}
                                        <Draggable
                                            defaultPosition={{ x: -76, y: -44 }}
                                        // onDrag={handleDrag}


                                        >
                                            <div className=' absolute text-4xl cursor-move hover:border top-[50%] left-[50%]' style={{ zIndex: "3", color: `${color}`, fontFamily: `${framTextfontfamilystate}` }}>{framtext}</div>
                                        </Draggable>
                                    </div>
                                )}
                                {selectedShape === 'square' && selectedImage && (
                                    <div className=' relative'>
                                        <img className='z-0' src={selectedImage}></img>
                                        {isDraggable ? (
                                            <Draggable
                                                position={position}
                                                onDrag={handleDrag}
                                            >

                                                <img onMouseOver={() => { handleFocus() }}
                                                    onMouseOut={handleBlur} width={"100px"} height={"600px"} style={{ zIndex: '2' }} className=' absolute cursor-move z-0 top-0 h-20 w-20 ' src={selectedImage2} style={{ transform: `scale(${scale})` }}  ></img>
                                            </Draggable>
                                        )
                                            : (
                                                <img onMouseOver={() => { handleFocus() }}
                                                    onMouseOut={handleBlur} width={"100px"} height={"600px"} style={{ zIndex: '2' }} className=' absolute cursor-move z-0 top-0 h-20 w-20 ' src={selectedImage2} style={{ transform: `scale(${scale})` }}  ></img>

                                            )
                                        }
                                        <Draggable
                                            defaultPosition={{ x: -76, y: -44 }}
                                        // onDrag={handleDrag}


                                        >
                                            <div className=' absolute text-4xl cursor-move hover:border top-[50%] left-[50%]' style={{ zIndex: "3", color: `${color}`, fontFamily: `${framTextfontfamilystate}` }}>{framtext}</div>
                                        </Draggable>

                                    </div>
                                )}
                                {selectedShape === 'circle' && selectedImage && (
                                    <div className=' relative'>
                                        <img className='z-0' src={selectedImage}></img>
                                        {isDraggable ? (
                                            <Draggable
                                                position={position}
                                                onDrag={handleDrag}
                                            >

                                                <img onMouseOver={() => { handleFocus() }}
                                                    onMouseOut={handleBlur} width={"100px"} height={"600px"} style={{ zIndex: '2' }} className=' rounded-full cursor-move absolute z-0 top-0 h-20 w-20 ' src={selectedImage2} style={{ transform: `scale(${scale})` }}  ></img>
                                            </Draggable>
                                        )
                                            : (
                                                <img onMouseOver={() => { handleFocus() }}
                                                    onMouseOut={handleBlur} width={"100px"} height={"600px"} style={{ zIndex: '2' }} className=' rounded-full cursor-move absolute z-0 top-0 h-20 w-20 ' src={selectedImage2} style={{ transform: `scale(${scale})` }}  ></img>

                                            )
                                        }
                                        <Draggable
                                            defaultPosition={{ x: -76, y: -44 }}
                                        // onDrag={handleDrag}


                                        >
                                            <div className=' absolute text-4xl cursor-move hover:border top-[50%] left-[50%]' style={{ zIndex: "3", color: `${color}`, fontFamily: `${framTextfontfamilystate}` }}>{framtext}</div>
                                        </Draggable>
                                    </div>
                                )}
                                {selectedShape === 'oval' && selectedImage && (
                                    <div className=' relative'>
                                        <img className='z-0' src={selectedImage}></img>
                                        {isDraggable ? (
                                            <Draggable
                                                position={position}
                                                onDrag={handleDrag}
                                            >

                                                <img onMouseOver={() => { handleFocus() }}
                                                    onMouseOut={handleBlur} width={"100px"} height={"600px"} style={{ zIndex: '2' }} className=' ronded-full absolute cursor-move z-0 top-0 h-20 w-20 ' src={selectedImage2} style={{ transform: `scale(${scale})` }}  ></img>
                                            </Draggable>
                                        )
                                            : (
                                                <img onMouseOver={() => { handleFocus() }}
                                                    onMouseOut={handleBlur} width={"100px"} height={"600px"} style={{ zIndex: '2' }} className=' rounded-full absolute z-0 cursor-move top-0 h-20 w-20 ' src={selectedImage2} style={{ transform: `scale(${scale})` }}  ></img>

                                            )
                                        }

                                        <Draggable
                                            defaultPosition={{ x: -76, y: -44 }}
                                        // onDrag={handleDrag}


                                        >
                                            <div className=' absolute text-4xl cursor-move hover:border top-[50%] left-[50%]' style={{ zIndex: "3", color: `${color}`, fontFamily: `${framTextfontfamilystate}` }}>{framtext}</div>
                                        </Draggable>

                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
                <div className="options">


                    <div className="upload-button my-4">
                        <div>



                            <button className="  rounded-md text-black relative" onClick={() => document.getElementById('my_modal_3').showModal()}>

                                🔍 Zoom

                            </button>
                            <dialog id="my_modal_3" className="modal">
                                <div className="modal-box">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button style={{ background: "transparent", color: "black" }} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-0 pb-20 m-20 pl-20">✕</button>
                                    </form>
                                    <div className=' flex items-center gap-7'>
                                        -
                                        <input
                                            type="range"
                                            min="20"
                                            max="100"
                                            className="range range-primary h-3"
                                            value={scale * 100} // Convert scale factor back to percentage for the slider
                                            onChange={handleSliderChange}
                                        /> +
                                    </div>
                                </div>
                                <form method="dialog" className="modal-backdrop">
                                    <button style={{ color: "transparent", background: "transparent" }}>close</button>
                                </form>
                            </dialog>


                        </div>
                        <button className="option rounded-md" onClick={() => document.getElementById('fileInput').click()}>
                            🖼️   Select Photo
                        </button>


                        {/* You can open the modal using document.getElementById('ID').showModal() method */}
                        <button className="text rounded-md" onClick={() => document.getElementById('my_modal_4').showModal()}>
                            📝 Text
                        </button>
                    
                        <dialog id="my_modal_4" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button style={{ background: "transparent", color: "black" }} className="btn  btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>

                                <div className='w-full' >
                                <label  className=' text-nowrap w-full inline-block text-start'>Add Text</label><br></br>
                                <input
                                    type='text'
                                    className='border w-72 md:w-96 relative left-0 md:mr-20 px-3 my-4 py-2 rounded-md'
                                    placeholder='Enter Your Text here'
                                    value={framtext} // Bind the state to the input value
                                    onChange={(e) => setFramText(e.target.value)} // Update state on change
                                />
                                <label className=' text-nowrap  w-full inline-block text-start'>Text Color</label><br></br>
                                <div className=' flex'>
                                     <input

                                    type='color'
                                    className='border w-20  relative left-0 inline-block h-8  md:mr-96  px-3 my-4  rounded-md'
                                    placeholder='Enter Your Text here'
                                    value={color} // Bind the state to the input value
                                    onChange={(e) => setColor(e.target.value)} // Update state on change
                                />
                                </div>
                               

                                <div className={`${framtext == "" ? "hidden" : "block"}`}>
                                    <label  className=' text-nowrap w-full inline-block text-start'>Text Style</label><br></br>
                                    {
                                        framTextfontfamily.map((text, index) => (
                                            <form method="dialog">
                                                <p className='border rounded-md my-3 text-2xl py-4 cursor-pointer' onClick={() => { setframTextfontfamilystate(text) }} key={index} style={{ fontFamily: `${text}` ,color: `${color}`, }}>{framtext}</p>
                                            </form>
                                        ))
                                    }


                                </div>
                                <div>

                                </div>
                                 </div>
                                <form method="dialog" className={`${framtext == "" ? "hidden" : "block"}`}>
                                    {/* if there is a button in form, it will close the modal */}
                                    <button style={{ background: "", color: "" }} className="btn text-white   w-full h-full  btn-outline btn-primar ">Save</button>
                                </form>
                            </div>
                        </dialog>
                        {/* {showTextInput && (
                        <form onSubmit={handleTextSubmit} className="text-input-form">
                            <input
                                type="text"
                                value={text}
                                onChange={handleTextChange}
                                placeholder="Enter your text"
                                className="text-input"
                            />
                            <button type="submit">Add Text</button>
                        </form>
                    )} */}
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>

                    <div className="shapes">
                        <h3 className='acrylic'>Acrylic Photo Shapes</h3>
                        <div className="shape-options pl-10  mt-2">

                            <svg
                                viewBox="0 0 600 400"
                                className={` shape-svg1 ${selectedShape === 'rectangle' ? 'border-blue' : ''} `}
                                onClick={() => handleShapeClick('rectangle')}
                            >
                                <rect x="10" y="10" width="480" height="280" fill="#c1995d" stroke="" strokeWidth="5" />
                            </svg>
                            <svg
                                viewBox="0 0 400 400"
                                className={`shape-svg2 ${selectedShape === 'square' ? 'border-blue' : ''}`}
                                onClick={() => handleShapeClick('square')}
                            >
                                <rect x="10" y="10" width="280" height="280" fill="#c1995d" stroke="" strokeWidth="5" />
                            </svg>


                            <svg
                                viewBox="0 0 200 200"
                                className={`shape-svg3 ${selectedShape === 'circle' ? 'border-blue' : ''}`}
                                onClick={() => handleShapeClick('circle')}
                                width="100"
                            >
                                <circle cx="100" cy="100" r="80" fill="#c1995d" stroke="" strokeWidth="5" />
                            </svg>


                            <svg
                                viewBox="0 0 400 400"
                                className={`shape-svg4 ${selectedShape === 'oval' ? 'border-blue' : ''}`}
                                onClick={() => handleShapeClick('oval')}
                            >
                                <ellipse cx="200" cy="200" rx="200" ry="100" fill="#c1995d" stroke="" strokeWidth="5" />
                            </svg>
                            <svg
                                viewBox="0 0 400 400"
                                className={`shape-svg5 ${selectedShape === 'roundedSquare' ? 'border-blue' : ''}`}
                                onClick={() => handleShapeClick('roundedSquare')}
                            >
                                <rect
                                    x="50"
                                    y="50"
                                    width="300"
                                    height="300"
                                    rx="50"
                                    ry="50"
                                    fill="#c1995d"
                                    stroke=""
                                    strokeWidth="5"
                                />
                            </svg>
                            <svg
                                viewBox="0 0 600 400"
                                className={`shape-svg6 ${selectedShape === 'roundedRectangle' ? 'border-blue' : ''}`}
                                onClick={() => handleShapeClick('roundedRectangle')}
                            >
                                <rect
                                    x="50"
                                    y="50"
                                    width="500"
                                    height="300"
                                    rx="50"
                                    ry="50"
                                    fill="#c1995d"
                                    stroke=""
                                    strokeWidth="5"
                                />
                            </svg>

                        </div>

                    </div>
                    <div className="size-options">
                        <br />
                        <br />

                        {/* <h3 className='acrylic1'>Size (Inch): {selectedSize}</h3> */}
                        {/* <div className="size-buttons">
                            <button onClick={() => handleSizeChange('12x9')} className={`size-button ${selectedSize === '12x9' ? 'active' : ''}`}>12x9</button>
                            <button onClick={() => handleSizeChange('11x11')} className={`size-button ${selectedSize === '11x11' ? 'active' : ''}`}>11x11</button>
                            <button onClick={() => handleSizeChange('16x12')} className={`size-button ${selectedSize === '16x12' ? 'active' : ''}`}>16x12</button>
                            <button onClick={() => handleSizeChange('16x16')} className={`size-button ${selectedSize === '16x16' ? 'active' : ''}`}>16x16</button>
                            <button onClick={() => handleSizeChange('21x15')} className={`size-button ${selectedSize === '21x15' ? 'active' : ''}`}>21x15</button>
                            <button onClick={() => handleSizeChange('35x23')} className={`size-button ${selectedSize === '35x23' ? 'active' : ''}`}>35x23</button>
                        </div> */}
                        <div className='size'>
                            <h3 className='acrylic1 ml-10 md:ml-0 my-3'>Size (Inch): {selectedSize}</h3>
                            <div className="size-buttons">
                                <button onClick={() => handleSizeChange1('12x9')} className={`size-button ${selectedSize === '12x9' ? 'active' : ''}  rounded-md  ${selectedSize === '12x9' ? '' : 'hover:ring'}`}>12x9</button>
                                <button onClick={() => handleSizeChange1('11x11')} className={`size-button ${selectedSize === '11x11' ? 'active' : ''} rounded-md  ${selectedSize === '11x11' ? '' : 'hover:ring'}`}>11x11</button>
                                <button onClick={() => handleSizeChange1('16x12')} className={`size-button ${selectedSize === '16x12' ? 'active' : ''} rounded-md  ${selectedSize === '16x12' ? '' : 'hover:ring'}`}>16x12</button>
                                <button onClick={() => handleSizeChange1('16x16')} className={`size-button ${selectedSize === '16x16' ? 'active' : ''} rounded-md  ${selectedSize === '16x16' ? '' : 'hover:ring'}`}>16x16</button>
                                <button onClick={() => handleSizeChange1('21x15')} className={`size-button ${selectedSize === '21x15' ? 'active' : ''} rounded-md  ${selectedSize === '21x15' ? '' : 'hover:ring'}`}>21x15</button>
                                <button onClick={() => handleSizeChange1('35x23')} className={`size-button ${selectedSize === '35x23' ? 'active' : ''} rounded-md  ${selectedSize === '35x23' ? '' : 'hover:ring'}`}>35x23</button>
                            </div>
                        </div>

                    </div>
                    <div className="thickness-options mr-12  md:mr-48">
                        <h3 className='acrylic1  my-3 '>Thickness: {selectedThickness}</h3>
                        <div className="thickness-buttons">
                            <button onClick={() => handleThicknessChange('3MM')} className={`thickness-button rounded-md ${selectedThickness === '3MM' ? 'active' : ''} ${selectedThickness === '3MM' ? '' : 'hover:ring'}`}>3MM</button>
                            <button onClick={() => handleThicknessChange('5MM')} className={`thickness-button rounded-md ${selectedThickness === '5MM' ? 'active' : ''} ${selectedThickness === '5MM' ? '' : 'hover:ring'}`}>5MM</button>
                            <button onClick={() => handleThicknessChange('8MM')} className={`thickness-button rounded-md ${selectedThickness === '8MM' ? 'active' : ''} ${selectedThickness === '5MM' ? '' : 'hover:ring'}`}>8MM</button>
                        </div>
                    </div>
                    <hr className='border-dashed border-[1px] border-gray-200 mb-2 w-screen md:w-[1200px]' />

                    <div className="price1 text-sm">
                        <span className='text-xl'>₹{price} <span className=' line-through text-gray-300'>₹{price + 1000}</span></span>
                        <p className='mt-6' style={{ fontWeight: "300" }}>  Photo quality for <span style={{ fontWeight: "600" }}>{selectedSize}</span> is <span className='text-green-500'>Good</span></p>
                        <p><span style={{ fontWeight: "300" }}>Quick mount:</span> <span className='text-bold text-balance'>Hridayam® Adhesive hooks (Included)</span></p>
                    </div>

                    <Link to='/place-order'> <button className="buy-now rounded-md px-20">BUY IT NOW</button></Link>

                    <div style={{ maxWidth: '60%', margin: '-30px auto'}}>

                    </div>
                </div>
            </div>

            <div>
            </div>
            <Footer />

        </>
    );
}

export default App;