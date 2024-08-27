// import React, { useRef, useState } from 'react';
// import Moveable from 'react-moveable';

// const TextEditer = () => {
//     const [origin,setorigin]=useState(false);
//     const [moveableKey, setMoveableKey] = useState(0); // To force re-render of Moveable
//     const [frame, setFrame] = useState({
//         translate: [0, 0],
//         scale: [1, 1],
//         rotate: 0,
//         width: 100,
//         height: 100,
//         fontSize: 16, // Initial font size
//     });
//     const targetRef = useRef(null);

//     const onDrag = ({ target, beforeTranslate }) => {
//         setFrame((prevFrame) => ({
//             ...prevFrame,
//             translate: beforeTranslate,
//         }));
//         applyTransform(target, frame.rotate, beforeTranslate);
//     };

//     const onResize = ({ target, width, height, drag }) => {
//         const beforeTranslate = drag.beforeTranslate;
//         const newFontSize = (width + height) / 10;
//         setFrame((prevFrame) => ({
//             ...prevFrame,
//             translate: beforeTranslate,
//             width,
//             height,
//             fontSize: newFontSize,
//         }));
//         target.style.width = `${width}px`;
//         target.style.height = `${height}px`;
//         target.style.fontSize = `${newFontSize}px`;
//         applyTransform(target, frame.rotate, beforeTranslate);
//     };

//     const onRotate = ({ target, beforeRotate }) => {
//         setFrame((prevFrame) => ({
//             ...prevFrame,
//             rotate: beforeRotate,
//         }));
//         applyTransform(target, beforeRotate, frame.translate);
//     };

//     // Helper function to apply all transformations
//     const applyTransform = (target, rotate, translate) => {
//         target.style.transform = `translate(${translate[0]}px, ${translate[1]}px) rotate(${rotate}deg)`;
//     };
//     const handleClick = () => {
//         setorigin(true);
//         setMoveableKey(prevKey => prevKey + 1); // Force re-render of Moveable
//     };

//     const handleOutClick = () => {
//         setorigin(false);
//         setMoveableKey(prevKey => prevKey + 1); // Force re-render of Moveable
//     };
//     console.log(origin)
//     return (
//         <div>
//          <div
                  
//                   onClick={handleClick} // Set origin true on click
//                   onMouseOut={handleOutClick} // Set origin false on outclick
//                     ref={targetRef}
//                     className="target"
//                     style={{
//                         width: '100px',
//                         height: '100px',
//                         fontSize: `${frame.fontSize}px`, // Apply the dynamic font size
                       
//                         transform: `translate(${frame.translate[0]}px, ${frame.translate[1]}px) rotate(${frame.rotate}deg)`,
//                     }}
//                 >
//                     Drag, Resize, or Rotate me!
//                 </div>
//             <div>
               
//                 <Moveable className='h-96 w-96'
//                     key={moveableKey}
//                     target={targetRef.current}
//                     draggable={true}
//                     resizable={true}
//                     rotatable={true}
//                     onDrag={onDrag}
//                     onResize={onResize}
//                     onRotate={onRotate}
//                     origin={origin} // Keep the origin fixed
//                 />
//                 <p>{origin}</p>
//             </div>
//         </div>
//     );
// };

// export default TextEditer;


import React, { useEffect, useRef } from 'react';
import * as fabric from 'fabric';
import Draggable from 'react-draggable';
import frameImage from "./images/oval.png"; // Importing the local image

const TextEditer = ({ text }) => {
  
    return (
        <>
           <div data-draggable="true" className="frame" style={styles.frame} >
            {/* <img className='selectDisable' src={frameImage} alt="Frame" style={styles.frameImage} /> */}
            <Draggable bounds="parent">
                <div className="draggable-element" style={styles.draggable}>
                    Drag Me!
                    <img  style={{ userSelect:"none", pointerEvents:"none", WebkitUserSelect:"none"}} src={frameImage}></img>
                </div>
            </Draggable>
        </div>
    
        </>
      
        
    );
};

const styles = {
    frame:{
        position: 'absolute',
        width: '400px',
        height: '400px',
        overflow: 'hidden',
        margin: '20px auto',
        border: '2px solid #ccc',
        borderRadius: '8px',
        zIndex:1,
        border:"10px solid ",

        borderImage:`url(${frameImage}) 20 100 70 fill`,
        borderImageOutset:"70px",
        
        boxsizing:"border-box"
    },
    frameImage:{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        WebkitUserSelect:"none",
        userSelect:"none",
        PointerEvent:"none",
        zIndex: 2, // Ensure the image stays behind the draggable content
    },

    draggable:{
        width: '100px',
        height: '100px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'move',
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex:1,
        transform: 'translate(-50%, -50%)',
    },
};

export default TextEditer;

// import React, { useEffect, useRef } from 'react';
// import * as  fabric  from 'fabric';
// import frameImage from './images/oval.png'; // Replace with your frame image path
// import dragElementImage from './images/oval.png'; // Replace with your draggable element image path

// const TextEditer = () => {
//     const canvasRef = useRef(null);

//     useEffect(() => {
//         // Initialize the Fabric.js canvas
//         const canvas = new fabric.Canvas(canvasRef.current, {
//             width: 400,
//             height: 300,
//             backgroundColor: 'lightgrey',
//         });

//         // Add the frame image as a background
//         fabric.Image.fromURL(frameImage, (img) => {
//             img.set({
//                 left: 0,
//                 top: 0,
//                 width: canvas.width,
//                 height: canvas.height,
//                 selectable: false, // Make sure the frame is not selectable
//                 evented: false,    // Prevent the frame from capturing events
//             });
//             canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
//         });

//         // Add a draggable image element inside the frame
//         fabric.Image.fromURL(dragElementImage, (img) => {
//             img.set({
//                 left: 100,
//                 top: 100,
//                 scaleX: 0.5,
//                 scaleY: 0.5,
//                 selectable: true, // Make the element draggable
//             });
//             canvas.add(img);
//         });

//         // Cleanup on component unmount
//         return () => {
//             canvas.dispose();
//         };
//     }, []);

//     return (
//         <div className="canvas-container" style={{ position: 'relative', width: '400px', margin: '20px auto' }}>
//             <canvas ref={canvasRef} className='border' />
//         </div>
//     );
// };

// export default TextEditer;
