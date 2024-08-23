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

const TextEditer = ({ text }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        // Initialize the Fabric.js canvas
        const canvas = new fabric.Canvas(canvasRef.current, {
            // width: 600,
            // height: 400,
            // backgroundColor: 'lightgrey',
        });

        // Add the background image
        fabric.Image.fromURL('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReIb5WQLTJZt3Jw2_H7p27LXjeA55mHxXedQ&s', (img) => {
            img.set({
                angle: 30,
                left: 50,
                top: 50,
                scaleX: 0.5,
                scaleY: 0.5,
                opacity: 0.4, // Correct property name for opacity
                selectable: true,
            });
            canvas.add(img); // Add the image to the canvas
            canvas.sendToBack(img); // Optional: Send the image to the back
        });

        // Add draggable text with a border
        const addText = (text) => {
            const newText = new fabric.Textbox(text,{
                left: 100,
                top: 100,
                fontSize: 30,
                fill: '#000000',
                fontFamily: 'sans-serif',
                selectable: true, // Make it draggable
                borderOpacityWhenMoving: 1, // Border visibility during drag
                hasControls: true, // Show control handles
            });

            // Add border to text
            newText.set({
                stroke: '#000000', // Border color
                strokeWidth: 1, // Border width
                padding: 5, // Padding between text and border
            });

            canvas.add(newText); // Add the text to the canvas
        };

        // Example: Add text to the canvas
        addText("helloo");

        // Cleanup on component unmount
        window.canvas = canvas;
        return () => {
            canvas.dispose();
        };
    }, []);

    return (
        <div className=" h-screen relative w-screen border-8 items-center justify-center">

            <canvas className='border absolute top-20' ref={canvasRef}/>
        </div>
    );
};

export default TextEditer;
