// import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { useNavigate } from 'react-router-dom';

// const Navbarlist = () => {
//   const navigate = useNavigate();
//   const [menuItems, setMenuItems] = useState([]);
//   const [subcategories, setSubcategories] = useState({});
//   const [dropdownOpen, setDropdownOpen] = useState(null);

//   // Handle click for subcategory
//   const handleSubcategoryClick = async (subCategoryId) => {
//     navigate(`/sub-category-products/${subCategoryId}`);
//   };

//   // Handle heading click to fetch and toggle subcategories
//   const handleHeadingClick = async (categoryId) => {
//     setDropdownOpen(prev => (prev === categoryId ? null : categoryId));
//     if (!subcategories[categoryId]) {
//       try {
//         const response = await fetch(`https://api.hirdayam.com/api/getSubCategoryByCategory?category_id=${categoryId}`);
//         const result = await response.json();
//         if (result.status) {
//           setSubcategories(prev => ({
//             ...prev,
//             [categoryId]: result.data
//           }));
//         } else {
//           console.error('Failed to fetch subcategories:', result.message);
//         }
//       } catch (error) {
//         console.error('Error fetching subcategories:', error);
//       }
//     }
//   };

//   // Fetch categories on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://api.hirdayam.com/api/getcategoryuser');
//         const result = await response.json();
//         if (result.status) {
//           const categories = result.data.map(category => ({
//             id: category._id,
//             heading: category.name,
//             image: category.image,
//           }));
//           setMenuItems(categories);
//         } else {
//           console.error('Failed to fetch categories:', result.message);
//         }
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 4,
//   };

//   return (
//     <div className='w-full max-w-[1100px] h-96 mx-auto'>
//       <Slider {...settings}>
//         {menuItems.map((item) => (
//           <div key={item.id} className=" p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
//             <div 
//               className="menu-heading text-lg font-semibold mb-2 cursor-pointer"
//               onMouseEnter={() => handleHeadingClick(item.id)}
//             >
//               {item.heading}
//             </div>
//             {subcategories[item.id] && dropdownOpen === item.id && (
//               <div className=" absolute top-0 w-9 left-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg  z-10">
//                 {subcategories[item.id].map((subCategory) => (
//                   <div 
//                     key={subCategory._id} 
//                     className="p-2 cursor-pointer hover:bg-gray-100"
//                     onClick={() => handleSubcategoryClick(subCategory._id)}
//                   >
//                     {subCategory.name}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default Navbarlist;



