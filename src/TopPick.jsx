import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

import image1 from './images/image 117.png';
import image2 from './images/image118.png';
import image3 from './images/image 118 (1).png';

export default function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
      <div style={{ width: '100vw', maxWidth: '80%', height: '30vh' }}>
        <Swiper
          slidesPerView={1}
         
          autoplay={true}
          spaceBetween={10}
          breakpoints={{
            400:{
                slidesPerView:1/2,
            },
            640: {
              
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 5/2,
              spaceBetween: 40,
              
            },
          }}
          modules={[Pagination,Autoplay]}
          className="mySwiper mt-4 w-full"
        
        >
          <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={image1} alt="Slide 1" style={{ width: '100%', height: '100%', objectFit: "contain", borderRadius: '10px' }} />
          </SwiperSlide>
          <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={image2} alt="Slide 2" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '10px' }} />
          </SwiperSlide>
          <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={image3} alt="Slide 3" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '10px' }} />
          </SwiperSlide>
          <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={image3} alt="Slide 4" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '10px' }} />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import { Pagination } from 'swiper/modules';

// export default function App() {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await fetch('https://api.hirdayam.com/api/bottomBannerforUser');
//         const result = await response.json();
//         console.log('Fetched result:', result); // Log fetched result

//         if (result.status && Array.isArray(result.data)) {
//           setImages(result.data);
//         } else {
//           console.error('Invalid data structure:', result);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchImages();
//   }, []);

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
//       <div style={{ width: '100vw', maxWidth: '80%', height: '40vh' }}>
//         <Swiper
//           slidesPerView={1}
//           spaceBetween={10}
//           breakpoints={{
//             640: {
//               slidesPerView: 2,
//               spaceBetween: 20,
//             },
//             768: {
//               slidesPerView: 2,
//               spaceBetween: 30,
//             },
//             1024: {
//               slidesPerView: 2,
//               spaceBetween: 40,
//             },
//           }}
//           modules={[Pagination]}
//           className="mySwiper mt-4 w-full"
//         >
//           {images.length > 0 ? (
//             images.map((item, index) => (
//               <SwiperSlide key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                 <img
//                   src={item.image}
//                   alt={`Slide ${index + 1}`}
//                   style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
//                   onError={(e) => {
//                     console.error(`Error loading image: ${item.image}`);
//                     e.target.style.display = 'none'; // Hide broken image
//                   }}
//                 />
//               </SwiperSlide>
//             ))
//           ) : (
//             <p>Loading...</p>
//           )}
//         </Swiper>
//       </div>
//     </div>
//   );
// }




