// // import React,{useState} from 'react'
// // import Draggable from 'react-draggable'
// // import image from "./images/rect7.jpg"
// // // import ReactWebEditor,{StyleEditorBlock,TextEditorBlock} from "react-web-editor";

// // const TextEditer = () => {
// //     const [position, setPosition] = useState({ x: 0, y: 0 });
// //     const handleDrag = (e, data) => {
// //         setPosition({ x: data.x, y: data.y });
// //     };
// //   return (
// //     <div 
// //       style={{
// //         margin:"auto",
// //         height: "400px",
// //         width: "400px",
// //         // backgroundImage: `url(${image})`, // Set border image as background
// //         borderImage:`url(${image}) 200 200 fill`,
// //         backgroundSize: 'cover',
// //         backgroundPosition: 'center',
// //         border: '8px solid transparent', // Optional, if you want an additional border
// //         position: 'relative',
// //         overflow: 'hidden',
// //         zIndex:20,
// //       }}
// //       className='z-50 absolute top-0'
// //     >
// //       <Draggable position={position} onDrag={handleDrag} bounds="parent">
// //         <div 
// //           style={{ 
// //             zIndex: 0, 
// //             left: '10px', 
// //             top: '10px', 
// //             cursor: 'move',
// //             width: '100px', // Set width for draggable image
// //             height: '100px', // Set height for draggable image
           
// //             backgroundImage: 'url("https://reactjsexample.com/assets/favicon.png")', // Draggable image
// //             backgroundSize: 'cover',
// //             backgroundPosition: 'center',
// //             border: '2px solid black',
// //           }} 
// //           className='select-none'
// //         />
// //       </Draggable>


// //       {/* <StyleEditorBlock
// //         width={200}
// //         height={300}
// //         left={left}
// //         top={top}
// //         parentStyle={{ width: 600, height: 800 }}
// //         unit={"px"}
// //       >
// //         <YourOwnComponent color={color} /> // It is just a option.
// //       </StyleEditorBlock> */}

// //       {/* <TextEditorBlock
// //         width={200}
// //         height={300}
// //         // left={left}
// //         // top={top}
// //         parentStyle={{ width: 600, height: 800 }}
// //         unit={"px"}
// //       /> */}
// //     </div>
// //   )
// // }

// // export default TextEditer


// // import React ,{useState,useEffect} from 'react';
// // import { DragAndDropTable } from 'react-web-editor';



// // const YourOwnComponent = ({ src }) => (
// //   <div>
// //     <img src={src} alt="draggable" style={{ width: '100px', height: '100px' }} />
// //   </div>
// // );

// // function TextEditer() {
// //     const cat = "https://example.com/cat.jpg";
// // const flower = "https://example.com/flower.jpg";
// // const bee = "https://example.com/bee.jpg";
// // const [allowances, setAllowances] = useState([]);

// // useEffect(() => {
// //   fetch('http://127.0.0.1:8000/allowances')
// //     .then(data => {
// //       return data.json();
// //     })
// //     .then(data => {
// //       setAllowances(data);
// //     })
// //     .catch(err => {
// //       console.log(123123);
// //     });
// // }, []);
// //   return (
// //     <div>
    
// //       <DragAndDropTable color={"pink"} isVertical={true}>
// //         <YourOwnComponent src={cat} />
// //         <YourOwnComponent src={flower} />
// //         <YourOwnComponent src={bee} />
// //       </DragAndDropTable>
// //     </div>
// //   );
// // }

// // export default TextEditer;
// // import React from 'react'
// // import * as fabric from "fabric"
// // import {useRef} from "react"
// // import image from "./images/rect2.jpg"

// // export const TextEditer = () => {
// //     const canvasref=useRef();
// // const handelimagage=(e)=>{
// //    const canvas=new fabric.Canvas(canvasref.current);
// //    let imgobj=e.target.files[0];
// //    let render=new FileReader();
// //    render.readAsDataURL(imgobj);
// //    render.onload=(e)=>{
// //     let imgurl=e.target.result
// //     let imageElement=document.createElement('img');
// //     imageElement.src=imgurl
// //     imageElement.onload=function(){
// //         let image=new fabric.Image(imageElement
// //             , {
// //                 lockScalingX: true, // Disable horizontal scaling
// //                 lockScalingY: true, // Disable vertical scaling
// //                 lockRotation: true, // Disable rotation
// //                 selectable: true,   // Allow dragging
// //           });
        
// //         // const fabricImage = new fabric.Image(imgElement
// //         canvas.add(image)
// //         canvas.centerObject(image)
// //         canvas.setActiveObject(image)
// //     }
// //    }
// // }

// //   return (
// //     <>
// //     <div>
// //         <div style={{background:`url(${image})`, backgroundSize:"contain" , backgroundRepeat:"no-repeat", backgroundPosition:"center" }} className={` bg-no-repeat absolute z-50    flex  h-96 w-96`}>
// //                  {/* <img src={image}></img>    */}
               

// //         </div>
// //         <canvas ref={canvasref} className='h-full w-full  z-0 relative' style={{ border:"2px solid black"}}>

// // </canvas>
// // </div>
// //         <input onChange={handelimagage} type='file' accept='image/*'>

// //         </input>
// //     </>
// //   )
// // }


// // export default TextEditer

// import { toPng } from 'html-to-image';
// import React, { useState ,useCallback,useRef, useContext} from 'react';
// import './Catalog.css'; // Import your CSS file
// import Header from './Header';
// import rect1 from './images/rect6.png'
// import PreviewImg from "./images/Preview.png"
// import circle1 from "./images/GOLDEN CIRCLE FRAME.jpg"
// import square from './images/SQUARE FRAME.jpg'
// import square1 from './images/GOLDEN SQUARE RAME.jpg'
// import rect2 from './images/RECTANGLE FEAME(1).jpg'
// import rect7 from './images/rect7.jpg'
// import oval from './images/oval.png'
// import oval1 from './images/OVALGold.png'
// import { AutoTextSize } from 'auto-text-size'
// import Draggable, { DraggableCore } from 'react-draggable';
// import { useScreenshot } from 'use-react-screenshot'
// import AvatarEditor from 'react-avatar-editor' // Both at the same time
// // import Editor from './Editer';
// import Tour from './Tour';
// import Footer from './Footer';
// import { Link, useNavigate } from 'react-router-dom';
// import backgroundImage from './images/Designer2.png';
// import circle from './images/CIRCLE FRAME.jpg'
// import { StyledEditorBlock, TextEditorBlock } from "react-web-editor"
// import { useEffect } from 'react';
// import html2canvas from 'html2canvas-pro';
// import { FeedbackReporter } from "@medanosol/react-feedback-report";
// import domtoimage from 'dom-to-image';
// import axios from 'axios';
// import { CartContext } from './CartContext';
// function App() {
//     const ref = useRef(null)
//     const navigate=useNavigate();
//     const [image10, takeScreenshot] = useScreenshot()
//    const {addToCart}=useContext(CartContext)
    
//     const [selectedImage3, setSelectedImage3] = useState(null);
//     const [selectedShape, setSelectedShape] = useState("rectangle");
//     const [selectedSize, setSelectedSize] = useState('12x9');
//     const [selectedThickness, setSelectedThickness] = useState('3MM');
//     const [selectedImage2, setSelectedImage2] = useState(null);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [scale, setScale] = useState(0.8);
//     const parentStyle = { width: 27, height: 20.5 };

//     const [framtext, setFramText] = useState(''); // State for the text input
//     const [color, setColor] = useState('#000000'); // State for the color input
//     //    const [selectedImage, setSelectedImage] = useState(false);
//     const [imageSelected, setImageSelected] = useState(false);
//     const [text, setText] = useState('');
//     const [showTextInput, setShowTextInput] = useState(false);
//     const [position, setPosition] = useState({ x: -200, y: 0 });
//     const [isDraggable, setIsDraggable] = useState(false);
//     const [framTextfontfamilystate, setframTextfontfamilystate] = useState("");
//     const [screenshot, setScreenshot] = useState(null);
//     const [acrylicsize4,setacrylicsize4]=useState([]);
//     const [thicknessdata,setthicknessdata]=useState([]);
//     const [sizeId ,setsizeId]=useState([]);
//     const [thicknessprice,setthicknessprice]=useState();
//     const [sizeprice,setsizeprice]=useState();
//     const [thicknessId,setthicknessId]=useState();
//     const handleSliderChange = (e) => {
//         setScale(e.target.value / 100);
//         console.log(scale)
//         // Convert range value to scale factor (0.2 to 1.0)
//     };
//     const handleTextChange = (e) => {
//         setText(e.target.value);
//     };

//     const captureScreenshot = () => {
//         html2canvas(ref.current,{
           
//             useCORS: true,
//       scrollX: 0,
//       scrollY: 1200,
//       width: ref.current.scrollWidth, // Capture full width of the element
//       height: ref.current.scrollHeight, // Capture full height of the element
//         }).then((canvas) => {
//             const imgData = canvas.toDataURL('image/png');
//             // Store imgData in your store or state
//             console.log(imgData);
//             setScreenshot(imgData); // This is the base64 image
//             // You can save it to a store (Redux, localStorage, etc.)
//           }).then(()=>{
//             handleAddToCart();
//           })
//       };
      
//     const handleFocus = () => {
//         setIsDraggable(true);
//     };


//     // const captureScreenshot = () => {
//     //   html2canvas(document.body).then((canvas) => {
//     //     const imgData = canvas.toDataURL('image/png');
//     //     setScreenshot(imgData); // Store the screenshot in the state
//     //   });
//     // };
    
    
//     const handleCapture = (captureFeedback) => {
//         // Handle the captured feedback data
//         console.log(captureFeedback+"sdfsdfjlkd");
//       };
     
//     const handlescreenshot = () => {
//         const element = document.getElementById("divtotakescreenshotof")
//         if(!element){
//             return;
//         }
//         html2canvas(element).then((canvas)=>{
//              let image=canvas.toDataURL("image/jpeg")
        
//              setScreenshot(image)
//              console.log(screenshot)
//         }).catch(err=>{
//             console.error("We can not take the screenshot of your element at this time")
//         })
//     }
    


   
//     const handleBlur = () => {
//         setIsDraggable(false);
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
//     const handleImageUpload = (e) => {
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

//     const handleDrag = (e, data) => {
//         setPosition({ x: data.x, y: data.y });
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

//     const handleThicknessChange = (thickness,price,id) => {
//         setSelectedThickness(thickness);
//         setthicknessprice(price)
//         setthicknessId(id)
//         setPrice(sizeprice+thicknessprice)
//     };
//     const handleImageClick1 = (imageSrc) => {
//         setSelectedImage2(imageSrc);
//     };
//     const [price, setPrice] = useState(699);

//     const sizePriceMap = {
//         '12x9': 699,
//         '11x11': 799,
//         '16x12': 899,
//         '16x16': 999,
//         '21x15': 1199,
//         '35x23': 1499,
//     };

//     const handleSizeChange1 = (size,sizeid,price) => {
//         setSelectedSize(size);
//         setsizeprice(price)
//         setsizeId(sizeid)
//         setPrice(sizeprice+thicknessprice);
//     };

//     const framTextfontfamily = ["Permanent Marker", "Grey Qo", "Matemasie", "Edu VIC WA NT Beginner", "Bodoni Moda SC"];


      
    
//     useEffect(() => {
       
      
//        fetchthikness()
//         fetchsize();
//       }, []);
      
//       // Empty dependency array to run only once on mount

//       useEffect(() => {
        
      
//         fetchthikness();
       
//       }, [sizeId]);

//       const fetchthikness = async () => {
//         const fetchTokenFromLS = () => {
//           return localStorage.getItem('token');
//         };
    
       
//         const token = fetchTokenFromLS();
    
//         if (token) {
//           try {
//             const response2 = await axios.get(`https://api.hirdayam.com/api/getAcrylicThickness?size_id=${sizeId}`, {
//               headers: {
//                 Authorization: `Bearer ${token}`, // Fixed interpolation
//               },
//             });
    
//             if (response2 && response2.data && response2.data.data) {
//               console.log('Get Acrylic Thikness:', response2);
//               let acrylicThiknessdata =response2.data.data;
//               setthicknessdata(acrylicThiknessdata); // Update state
//               //     if(acrylicsize){
             
//               console.log( "updated",thicknessdata);

//               // }
    
//               // Ensure state is updated before logging
//             }
    
//             if (response2.data.status === true && Array.isArray(response2.data.data)) {
//               // Your logic here
//             } else {
//               console.error('Unexpected response format:', response2.data);
//             }
//           } catch (error) {
//             console.error('Acrylic thikeness item error:', error);
//           }
//         } else {
//           console.error('Token not found in localStorage.');
//         }
//       };



//       const fetchsize = async () => {
//         const fetchTokenFromLS = () => {
//           return localStorage.getItem('token');
//         };
    
       
//         const token = fetchTokenFromLS();
    
//         if (token) {
//           try {
//             const response = await axios.get('https://api.hirdayam.com/api/getAcrylicSize', {
//               headers: {
//                 Authorization: `Bearer ${token}`, // Fixed interpolation
//               },
//             });
    
//             if (response && response.data && response.data.data) {
//               console.log('Get Acrylic size:', response);
//               let acrylicSizedata =response.data.data;
//               setacrylicsize4(acrylicSizedata); // Update state
//               // if(acrylicsize){
             
//               console.log( "updated",acrylicsize4);
               
//               // }
    
//               // Ensure state is updated before logging
//             }
    
//             if (response.data.status === true && Array.isArray(response.data.data)) {
//               // Your logic here
//             } else {
//               console.error('Unexpected response format:', response.data);
//             }
//           } catch (error) {
//             console.error('Acrylic size item error:', error);
//           }
//         } else {
//           console.error('Token not found in localStorage.');
//         }
//       };
      

     
//       const handleAddToCart = () => {
//         // console.log(getSingleProduct.variations[0]+"new variation")
//         console.log(sizeId)
//         if (true) {
//           const productToAdd = {
//             // id: "",
//             // name: "",
//             // price:"",
//             // image: "",
//             // text:"",
//             // color:"" ,
//             // variation: "",
//             id:null,
//             acrylicsizeid:sizeId,
//             acrylicsizename:selectedSize,
//             acrylicthicknessid:thicknessId,
//             acrylicthicknessname:selectedThickness,
//             acrylicprice:price,
//             acrylicfinalpreview:screenshot,
//           };
//           console.log(productToAdd.acrylicsizename+"new Acylic")

//         //   if(file==null && filteredCard?.product_type=="personalize"){
//         //       alert("Please Select a Image")
//         //   }
//         //   else{
//              addToCart(productToAdd,1);
//           navigate('/cart');
//         //   }
         
//         }
//       };



      
  
    
    
    
     
//     return (
//         <>
        
//             <Header />
//             <Tour />
            
           
           
//             <div  className="container ml-1 mt-24 md:mt-10">
//                 <div style={{
//                     backgroundSize: 'cover', // or 'contain' depending on your requirement
//                     backgroundPosition: 'center', // centers the image
//                     backgroundRepeat: 'no-repeat', // prevents the image from repeating
//                 }}>
//                     <h1 className='acrylic'>Acrylic Photo Borders</h1>

//                     <div id="form-id"  className="profile-pictures">
//                         <div  className="shape-content ">
//                             {selectedShape === 'rectangle' && (
//                                 <div className="rectangle-section gap-1 md:gap-6 mt-4" style={{ display: 'flex' }}>

//                                     <img src={rect1} style={{ height: '60px', width: '60px' }} onClick={() => handleImageClick(rect1)} />
//                                     <img src={rect7} style={{ height: '60px', width: '60px' }} onClick={() => handleImageClick(rect7)} />
//                                     <img src={rect1} style={{ height: '60px', width: '60px' }} onClick={() => handleImageClick(rect1)} />
//                                     <img src={rect7} style={{ height: '60px', width: '60px' }} onClick={() => handleImageClick(rect7)} />
//                                     <img src={rect1} style={{ height: '60px', width: '60px' }} onClick={() => handleImageClick(rect1)} />
//                                     <img src={rect7} style={{ height: '60px', width: '60px' }} onClick={() => handleImageClick(rect7)} />
//                                 </div>
//                             )}

//                             {selectedShape === 'square' && (
//                                 <div className="square-section" style={{ display: 'flex' }}>
//                                     <img src={square} style={{ height: '60px', width: '60px', marginTop: '5px' }} onClick={() => handleImageClick(square)} />
//                                     <img src={square1} style={{ height: '60px', width: '60px', marginTop: '5px' }} onClick={() => handleImageClick(square1)} />

//                                 </div>
//                             )}

//                             {selectedShape === 'circle' && (
//                                 <div className="circle-section" style={{ display: 'flex', gap: '10px' }}>

//                                     <img src={circle} style={{ height: '60px', width: '60px', marginTop: '5px' }} onClick={() => handleImageClick(circle)} />
//                                     <img src={circle1} style={{ height: '60px', width: '60px', marginTop: '5px' }} onClick={() => handleImageClick(circle1)} />

//                                 </div>
//                             )}

//                             {selectedShape === 'oval' && (
//                                 <div className="oval-section" style={{ display: 'flex' }}>

//                                     <img src={oval} style={{ height: '60px', width: '60px', marginTop: '5px' }} onClick={() => handleImageClick(oval)} />
//                                     <img src={oval1} style={{ height: '60px', width: '60px', marginTop: '5px' }} onClick={() => handleImageClick(oval1)} />


//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                     <div   className=' w-screen m-auto  md:w-[1140px] ' style={{
//                         backgroundImage: `url(${backgroundImage})`,
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                         overflow: "hidden",
//                         backgroundRepeat: 'no-repeat',
//                     }}>
//                     {/* <img src={image}></img> */}
//                         <div   className="preview">

//                             <div ref={ref} className="image-container">
//                                 <div ref={ref}  className={` ${selectedImage == null ? "block" : "hidden"}`}>

//                                     <img onMouseOver={() => { handleFocus() }}
//                                         onMouseOut={handleBlur} style={{ zIndex: '0' }} className=' z-0 top-0 h-20 w-20 ' src={selectedImage2} style={{ transform: `scale(${scale})` }} />

//                                     <div 
//                                     onMouseOver={() => { handleFocus() }}
//                                         onMouseOut={handleBlur}
//                                          className={`relative ${selectedImage2 == null ? "block" : "hidden"}`}>
//                                         {isDraggable ? (
//                                             <Draggable
//                                                 position={position}
//                                                 onDrag={handleDrag}
//                                             >
//                                                 <div
//                                                     style={{ transform: `scale(${scale})` ,backgroundImage:`url(${PreviewImg})` , backgroundSize:"contain", backgroundRepeat:"no-repeat", backgroundPosition:"center" }} 
//                                                     className={`shadow-2xl h-96 w-96 z-40  cursor-move ${selectedShape === 'oval' ? 'rounded-[80%]' : ''} ${selectedShape === 'roundedSquare' ? 'rounded-[15%]' : ''} ${selectedShape === 'roundedRectangle' ? 'rounded-[10%]' : ''} ${selectedShape === 'circle'?"rounded-[50%]":""} `}
//                                                     src={PreviewImg} 
//                                                     alt="Draggable" 

//                                                ></div>
//                                             </Draggable>
//                                         ) : (
//                                             <img
//                                                 style={{
//                                                     transform: `scale(${scale})`, position: " relative",  // Positioning to match draggable
//                                                     left: `${position.x}`,
//                                                     top: `${position.y}`,
//                                                 }}
//                                                 className={`shadow-2xl   ${selectedShape === 'oval' ? 'rounded-[80%]' : ''} ${selectedShape === 'roundedSquare' ? 'rounded-[15%]' : ''} ${selectedShape === 'roundedRectangle' ? 'rounded-[10%]' : ''} ${selectedShape === 'circle'?"rounded-[50%]":""} `}
//                                                 src={PreviewImg}
//                                                 alt="Not Draggable"
//                                             />
//                                         )}
//                                         <Draggable 
                                        
//                                             defaultPosition={{ x: -76, y: -44 }}
//                                         // onDrag={handleDrag}


//                                         >
//                                             <div className=' absolute z-0 text-4xl cursor-move hover:border top-[50%] left-[50%]' style={{ zIndex: "3", color: `${color}`, transform:`scale($scale)`, transformOrigin: 'center',  fontFamily: `${framTextfontfamilystate}` }}>{framtext}</div>
//                                         </Draggable>
//                                         {/* <div  className=' text-3xl text-white  border px-3 py-4  bg-black/30 rounded-md  absolute top-[30%] left-[35%]'>PREVIEW</div> */}

//                                     </div>
//                                 </div>
//                                 {selectedShape === 'rectangle' && selectedImage && (
//                                     <div ref={ref} className=' relative'>
//                                         <img onMouseOver={() => { handleFocus() }}
//                                                     onMouseOut={handleBlur}
//                                                      className=' h-20 w-20 z-20' style={{ zIndex: "1" }} src={selectedImage}
//                                             style={{
//                                                 width: '100%', // Adjust width as needed
//                                                 height: 'auto'
//                                                 , position: "relative",
//                                                 // Maintain aspect ratio
//                                             }}></img>
//                                         {isDraggable ? (
//                                             <Draggable
//                                              scale={scale}
//                                                 position={position}
//                                                 onDrag={handleDrag}
//                                             >

//                                                 <div
//                                                  onMouseOver={() => { handleFocus() }}
//                                                     onMouseOut={handleBlur}
//                                                       className=' absolute z-40 p-10 cursor-move top-0 h-[600px] w-[800px] border-8 ' src={selectedImage2} 
//                                                      style={{ transform: `scale(${scale})`, backgroundImage:`url(${selectedImage2})` , backgroundRepeat:"no-repeat", backgroundSize:"contain",  backgroundPosition:"center" }}  >

//                                                     </div>
//                                             </Draggable>
//                                         )
//                                             : (
                                               
                                                 
//                                                    <Draggable  scale={scale} position={position} onDrag={handleDrag}>

//                                                    <div
                                                
//                                                       className=' absolute z-0 p-10 cursor-move top-0 h-[600px] w-[800px] border-8 ' src={selectedImage2} 
//                                                      style={{translate:`(${position.x}px, ${position.y}px) scale(${scale})`, backgroundImage:`url(${selectedImage2})` , backgroundRepeat:"no-repeat", backgroundSize:"contain",  backgroundPosition:"center" }}  >

//                                                     </div>
//                                             </Draggable>
                                                  

//                                             )
//                                         }
//                                         {/* <p className=' relative text-black top-0 left-0'>Text</p> */}
//                                         <Draggable
//                                         onMouseOver={() => { handleFocus() }}
//                                                     onMouseOut={handleBlur}
//                                             defaultPosition={{ x: -76, y: -44 }}


//                                         >
//                                             <div className=' absolute z-40 text-4xl cursor-move hover:border top-[50%] left-[50%]' style={{  color: `${color}`, fontFamily: `${framTextfontfamilystate}` }}>{framtext}</div>
//                                         </Draggable>
//                                     </div>
//                                 )}
//                                 {selectedShape === 'square' && selectedImage && (
//                                     <div className=' relative bg-white'>
//                                     <div className='h-full w-full bg-white'>
//                                     {/* <img className='z-50' src={selectedImage}></img> */}
//                                     <img onMouseOver={() => { handleFocus() }}
//                                                     onMouseOut={handleBlur}
//                                                      className=' py-20  z-20' style={{ zIndex: "1" }} src={selectedImage}
//                                             style={{
//                                                 width: '100%', // Adjust width as needed
//                                                 height: '100%'
//                                                 , position: "relative",
//                                                 // Maintain aspect ratio
//                                             }}></img>
//                                             </div>
//                                         {isDraggable ? (
//                                           <Draggable
//                                              scale={scale}
//                                                 position={position}
//                                                 onDrag={handleDrag}
//                                             >

//                                                 <div
//                                                  onMouseOver={() => { handleFocus() }}
//                                                     onMouseOut={handleBlur}
//                                                       className=' absolute z-40 p-10 cursor-move top-0 h-[600px] w-[800px] border-8 ' src={selectedImage2} 
//                                                      style={{ transform: `scale(${scale})`, backgroundImage:`url(${selectedImage2})` , backgroundRepeat:"no-repeat", backgroundSize:"contain",  backgroundPosition:"center" }}  >

//                                                     </div>
//                                             </Draggable>
//                                         )
//                                             : (
//                                               <Draggable  scale={scale} position={position} onDrag={handleDrag}>

// <div

//    className=' absolute z-0 p-10 cursor-move top-0 h-[600px] w-[800px] border-8 ' src={selectedImage2} 
//   style={{translate:`(${position.x}px, ${position.y}px) scale(${scale})`, backgroundImage:`url(${selectedImage2})` , backgroundRepeat:"no-repeat", backgroundSize:"contain",  backgroundPosition:"center" }}  >

//  </div>
// </Draggable>

//                                             )
//                                         }

//                                         <Draggable
//                                         onMouseOver={() => { handleFocus() }}
//                                                     onMouseOut={handleBlur}
//                                             defaultPosition={{ x: -76, y: -44 }}


//                                         >
//                                             <div className=' absolute z-40 text-4xl cursor-move hover:border top-[50%] left-[50%]' style={{  color: `${color}`, fontFamily: `${framTextfontfamilystate}` }}>{framtext}</div>
//                                         </Draggable>

//                                     </div>
//                                 )}
//                                 {selectedShape === 'circle' && selectedImage && (
//                                     <div className=' relative'>
//                                         {/* <img className='z-0' src={selectedImage}></img> */}
//                                         <div className='h-full w-full bg-white py-20'>
//                                         <img onMouseOver={() => { handleFocus() }}
//                                                     onMouseOut={handleBlur}
//                                                      className=' h-20 w-20 z-20' style={{ zIndex: "1" }} src={selectedImage}
//                                             style={{
//                                                 width: '100%', // Adjust width as needed
//                                                 height: 'auto'
//                                                 , position: "relative",
//                                                 // Maintain aspect ratio
//                                             }}></img>
//                                             </div>
//                                         {isDraggable ? (
//                                           <Draggable
//                                              scale={scale}
//                                                 position={position}
//                                                 onDrag={handleDrag}
//                                             >

//                                                 <div
//                                                  onMouseOver={() => { handleFocus() }}
//                                                     onMouseOut={handleBlur}
//                                                       className=' absolute z-40 p-10 cursor-move top-0 h-[600px] w-[800px] border-8 ' src={selectedImage2} 
//                                                      style={{ transform: `scale(${scale})`, backgroundImage:`url(${selectedImage2})` , backgroundRepeat:"no-repeat", backgroundSize:"contain",  backgroundPosition:"center" }}  >

//                                                     </div>
//                                             </Draggable>
//                                         )
//                                             : (
//                                               <Draggable  scale={scale} position={position} onDrag={handleDrag}>

// <div

//    className=' absolute z-0 p-10 rounded-full cursor-move top-0 h-[600px] w-[800px]  ' src={selectedImage2} 
//   style={{translate:`(${position.x}px, ${position.y}px) scale(${scale})`, backgroundImage:`url(${selectedImage2})` , backgroundRepeat:"no-repeat", backgroundSize:"contain",  backgroundPosition:"center" }}  >

//  </div>
// </Draggable>

//                                             )
//                                         }
//                                         <Draggable
//                                         onMouseOver={() => { handleFocus() }}
//                                                     onMouseOut={handleBlur}
//                                             defaultPosition={{ x: -76, y: -44 }}


//                                         >
//                                             <div className=' absolute z-40 text-4xl cursor-move hover:border top-[50%] left-[50%]' style={{  color: `${color}`, fontFamily: `${framTextfontfamilystate}` }}>{framtext}</div>
//                                         </Draggable>
//                                     </div>
//                                 )}
//                                 {selectedShape === 'oval' && selectedImage && (
//                                     <div className=' relative'>
//                                         {/* <img className='z-0' src={selectedImage}></img> */}
                                  
//                                         {/* <img className='z-0' src={selectedImage}></img> */}
//                                         <div>
//                                         <img onMouseOver={() => { handleFocus() }}
//                                                     onMouseOut={handleBlur}
//                                                      className=' h-20 w-20 z-20' style={{ zIndex: "1" }} src={selectedImage}
//                                             style={{
//                                                 width: '100%', // Adjust width as needed
//                                                 height: 'auto'
//                                                 , position: "relative",
//                                                 // Maintain aspect ratio
//                                             }}></img>
//                                             </div>
//                                         {isDraggable ? (
//                                           <Draggable
//                                              scale={scale}
//                                                 position={position}
//                                                 onDrag={handleDrag}
//                                             >

//                                                 <div
//                                                  onMouseOver={() => { handleFocus() }}
//                                                     onMouseOut={handleBlur}
//                                                       className=' absolute z-40 p-10 cursor-move top-0 h-[600px] w-[800px] border-8 ' src={selectedImage2} 
//                                                      style={{ transform: `scale(${scale})`, backgroundImage:`url(${selectedImage2})` , backgroundRepeat:"no-repeat", backgroundSize:"contain",  backgroundPosition:"center" }}  >

//                                                     </div>
//                                             </Draggable>
//                                         )
//                                             : (
//                                               <Draggable  scale={scale} position={position} onDrag={handleDrag}>

// <div

//    className=' absolute z-0 p-10 rounded-full cursor-move top-0 h-[600px] w-[800px]  ' src={selectedImage2} 
//   style={{translate:`(${position.x}px, ${position.y}px) scale(${scale})`, backgroundImage:`url(${selectedImage2})` , backgroundRepeat:"no-repeat", backgroundSize:"contain",  backgroundPosition:"center" }}  >

//  </div>
// </Draggable>

//                                             )
//                                         }

//                                         <Draggable
//                                         onMouseOver={() => { handleFocus() }}
//                                                     onMouseOut={handleBlur}
//                                             defaultPosition={{ x: -76, y: -44 }}


//                                         >
//                                             <div className=' absolute z-40 text-4xl cursor-move hover:border top-[50%] left-[50%]' style={{  color: `${color}`, fontFamily: `${framTextfontfamilystate}` }}>{framtext}</div>
//                                         </Draggable>

//                                     </div>
//                                 )}
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//                 <div className="options">


//                     <div className="upload-button my-4">
//                         <div>



//                             <button className="  rounded-md text-black relative" onClick={() => document.getElementById('my_modal_3').showModal()}>

//                                 🔍 Zoom

//                             </button>
//                             <dialog id="my_modal_3" className="modal">
//                                 <div className="modal-box">
//                                     <form method="dialog">
//                                         {/* if there is a button in form, it will close the modal */}
//                                         <button style={{ background: "transparent", color: "black" }} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-0 pb-20 m-20 pl-20">✕</button>
//                                     </form>
//                                     <div className=' flex items-center gap-7'>
//                                         -
//                                         <input
//                                             type="range"
//                                             min="20"
//                                             max="100"
//                                             className="range range-primary h-3"
//                                             value={scale * 100} // Convert scale factor back to percentage for the slider
//                                             onChange={handleSliderChange}
//                                         /> +
//                                     </div>
//                                 </div>
//                                 <form method="dialog" className="modal-backdrop">
//                                     <button style={{ color: "transparent", background: "transparent" }}>close</button>
//                                 </form>
//                             </dialog>


//                         </div>
//                         <button className="option rounded-md" onClick={() => document.getElementById('fileInput').click()}>
//                             🖼️   Select Photo
//                         </button>


//                         {/* You can open the modal using document.getElementById('ID').showModal() method */}
//                         <button className="text rounded-md" onClick={() => document.getElementById('my_modal_4').showModal()}>
//                             📝 Text
//                         </button>
                    
//                         <dialog id="my_modal_4" className="modal">
//                             <div className="modal-box">
//                                 <form method="dialog">
//                                     {/* if there is a button in form, it will close the modal */}
//                                     <button style={{ background: "transparent", color: "black" }} className="btn  btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
//                                 </form>

//                                 <div className='w-full'>
//                                 <label  className=' text-nowrap w-full inline-block text-start'>Add Text</label><br></br>
//                                 <input
//                                     type='text'
//                                     className='border w-72 md:w-96 relative left-0 md:mr-20 px-3 my-4 py-2 rounded-md'
//                                     placeholder='Enter Your Text here'
//                                     value={framtext} // Bind the state to the input value
//                                     onChange={(e) => setFramText(e.target.value)} // Update state on change
//                                 />
//                                 <label className=' text-nowrap  w-full inline-block text-start'>Text Color</label><br></br>
//                                 <div className=' flex'>
//                                      <input

//                                     type='color'
//                                     className='border w-20  relative left-0 inline-block h-8  md:mr-96  px-3 my-4  rounded-md'
//                                     placeholder='Enter Your Text here'
//                                     value={color} // Bind the state to the input value
//                                     onChange={(e) => setColor(e.target.value)} // Update state on change
//                                 />
//                                 </div>
                               

//                                 <div className={`${framtext == "" ? "hidden" : "block"}`}>
//                                     <label  className=' text-nowrap w-full inline-block text-start'>Text Style</label><br></br>
//                                     {
//                                         framTextfontfamily.map((text, index) => (
//                                             <form method="dialog">
//                                                 <p className='border rounded-md my-3 text-2xl py-4 cursor-pointer' onClick={() => { setframTextfontfamilystate(text) }} key={index} style={{ fontFamily: `${text}` ,color: `${color}`, }}>{framtext}</p>
//                                             </form>
//                                         ))
//                                     }


//                                 </div>
//                                 <div>

//                                 </div>
//                                  </div>
//                                 <form method="dialog" className={`${framtext == "" ? "hidden" : "block"}`}>
//                                     {/* if there is a button in form, it will close the modal */}
//                                     <button style={{ background: "", color: "" }} className="btn text-white   w-full h-full  btn-outline btn-primar ">Save</button>
//                                 </form>
//                             </div>
//                         </dialog>
//                         <input
//                             type="file"
//                             id="fileInput"
//                             style={{ display: 'none' }}
//                             accept="image/*"
//                             onChange={handleImageUpload}
//                         />
//                     </div>

//                     <div className="shapes">
//                         <h3 className='acrylic'>Acrylic Photo Shapes</h3>
//                         <div className="shape-options pl-10  mt-2">

//                             <svg
//                                 viewBox="0 0 600 400"
//                                 className={` shape-svg1 ${selectedShape === 'rectangle' ? 'border-blue' : ''} `}
//                                 onClick={() => handleShapeClick('rectangle')}
//                             >
//                                 <rect x="10" y="10" width="480" height="280" fill="#c1995d" stroke="" strokeWidth="5" />
//                             </svg>
//                             <svg
//                                 viewBox="0 0 400 400"
//                                 className={`shape-svg2 ${selectedShape === 'square' ? 'border-blue' : ''}`}
//                                 onClick={() => handleShapeClick('square')}
//                             >
//                                 <rect x="10" y="10" width="280" height="280" fill="#c1995d" stroke="" strokeWidth="5" />
//                             </svg>


//                             <svg
//                                 viewBox="0 0 200 200"
//                                 className={`shape-svg3 ${selectedShape === 'circle' ? 'border-blue' : ''}`}
//                                 onClick={() => handleShapeClick('circle')}
//                                 width="100"
//                             >
//                                 <circle cx="100" cy="100" r="80" fill="#c1995d" stroke="" strokeWidth="5" />
//                             </svg>


//                             <svg
//                                 viewBox="0 0 400 400"
//                                 className={`shape-svg4 ${selectedShape === 'oval' ? 'border-blue' : ''}`}
//                                 onClick={() => handleShapeClick('oval')}
//                             >
//                                 <ellipse cx="200" cy="200" rx="200" ry="100" fill="#c1995d" stroke="" strokeWidth="5" />
//                             </svg>
//                             <svg
//                                 viewBox="0 0 400 400"
//                                 className={`shape-svg5 ${selectedShape === 'roundedSquare' ? 'border-blue' : ''}`}
//                                 onClick={() => handleShapeClick('roundedSquare')}
//                             >
//                                 <rect
//                                     x="50"
//                                     y="50"
//                                     width="300"
//                                     height="300"
//                                     rx="50"
//                                     ry="50"
//                                     fill="#c1995d"
//                                     stroke=""
//                                     strokeWidth="5"
//                                 />
//                             </svg>
//                             <svg
//                                 viewBox="0 0 600 400"
//                                 className={`shape-svg6 ${selectedShape === 'roundedRectangle' ? 'border-blue' : ''}`}
//                                 onClick={() => handleShapeClick('roundedRectangle')}
//                             >
//                                 <rect
//                                     x="50"
//                                     y="50"
//                                     width="500"
//                                     height="300"
//                                     rx="50"
//                                     ry="50"
//                                     fill="#c1995d"
//                                     stroke=""
//                                     strokeWidth="5"
//                                 />
//                             </svg>

//                         </div>

//                     </div>
//                     <div className="size-options">
//                         <br />
//                         <br />
//                         <div className='size'>
//                             <h3 className='acrylic1 ml-10 md:ml-0 my-3'>Size (Inch): {selectedSize}</h3>
//                           <div className='size-buttons'> { acrylicsize4.length>0?(acrylicsize4.map((item,index)=>{
//                             return(
//                                 <div   key={index}>
//                                 <button onClick={() => handleSizeChange1(item.size,item._id,item.price)} className={`size-button ${selectedSize === item.size ? 'active' : ''} rounded-md  ${selectedSize === item.size ? '' : 'hover:ring'}`}>{item.size}</button>

//                                 </div>
                                

//                             );
                                    
//                            })):("sdfk")
//                            }
//                            </div>
//                             {/* <div className="size-buttons">
//                                 <button onClick={() => handleSizeChange1('11x11')} className={`size-button ${selectedSize === '11x11' ? 'active' : ''} rounded-md  ${selectedSize === '11x11' ? '' : 'hover:ring'}`}>11x11</button>
//                                 <button onClick={() => handleSizeChange1('16x12')} className={`size-button ${selectedSize === '16x12' ? 'active' : ''} rounded-md  ${selectedSize === '16x12' ? '' : 'hover:ring'}`}>16x12</button>
//                                 <button onClick={() => handleSizeChange1('16x16')} className={`size-button ${selectedSize === '16x16' ? 'active' : ''} rounded-md  ${selectedSize === '16x16' ? '' : 'hover:ring'}`}>16x16</button>
//                                 <button onClick={() => handleSizeChange1('21x15')} className={`size-button ${selectedSize === '21x15' ? 'active' : ''} rounded-md  ${selectedSize === '21x15' ? '' : 'hover:ring'}`}>21x15</button>
//                                 <button onClick={() => handleSizeChange1('35x23')} className={`size-button ${selectedSize === '35x23' ? 'active' : ''} rounded-md  ${selectedSize === '35x23' ? '' : 'hover:ring'}`}>35x23</button>
//                             </div> */}
//                         </div>

//                     </div>

//                     <div className="thickness-options mr-12  md:mr-48">
//                         <h3 className='acrylic1  my-3 '>Thickness: {selectedThickness}</h3>

//                         <div className='thickness-buttons'> { thicknessdata.length>0?(thicknessdata.map((item,index)=>{
//                             return(
//                                 <div   key={index}>
//                                 {/* <button onClick={() => handleSizeChange1(item.size,item._id)} className={`size-button ${selectedSize === item.size ? 'active' : ''} rounded-md  ${selectedSize === item.size ? '' : 'hover:ring'}`}>{item.size}</button> */}
//                              <button onClick={() => {handleThicknessChange(item.thickness,item.price,item._id)}} className={`thickness-button rounded-md ${selectedThickness === item.thickness ? 'active' : ''} ${selectedThickness === item.thickness ? '' : 'hover:ring'}`}>{item.thickness}</button>

//                                 </div>
                                

//                             );
                                    
//                            })):(<div>skdf</div>)
//                            }
//                            </div>
//                         {/* <div className="thickness-buttons">
//                             <button onClick={() => handleThicknessChange('3MM')} className={`thickness-button rounded-md ${selectedThickness === '3MM' ? 'active' : ''} ${selectedThickness === '3MM' ? '' : 'hover:ring'}`}>3MM</button>
//                             <button onClick={() => handleThicknessChange('5MM')} className={`thickness-button rounded-md ${selectedThickness === '5MM' ? 'active' : ''} ${selectedThickness === '5MM' ? '' : 'hover:ring'}`}>5MM</button>
//                             <button onClick={() => handleThicknessChange('8MM')} className={`thickness-button rounded-md ${selectedThickness === '8MM' ? 'active' : ''} ${selectedThickness === '5MM' ? '' : 'hover:ring'}`}>8MM</button>
//                         </div> */}
//                     </div>
//                     <hr className='border-dashed border-[1px] border-gray-200 mb-2 w-screen md:w-[1200px]' />

//                     <div className="price1 text-sm">
//                         <span className='text-xl'>₹{price} <span className=' line-through text-gray-300'>₹{price + 1000}</span></span>
//                         <p className='mt-6' style={{ fontWeight: "300" }}>  Photo quality for <span style={{ fontWeight: "600" }}>{selectedSize}</span> is <span className='text-green-500'>Good</span></p>
//                         <p><span style={{ fontWeight: "300" }}>Quick mount:</span> <span className='text-bold text-balance'>Hridayam® Adhesive hooks (Included)</span></p>
//                     </div>

//                     {/* <Link to='/checkout'> */}
//                      <button onClick={captureScreenshot} className="buy-now rounded-md px-20">BUY IT NOW</button>
//                      {/* </Link> */}

//                     <div style={{ maxWidth: '60%', margin: '-30px auto'}}>

//                     </div>
//                 </div>
//             </div>


        
//             <img src={screenshot}></img>
//               <div>
//             </div>
//             <Footer />

//         </>
//     );
// }

// export default App;