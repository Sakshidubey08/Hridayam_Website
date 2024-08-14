// import React, { useEffect, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';

// export default function App() {
//   const [slides, setSlides] = useState([]);

//   useEffect(() => {
//     const fetchSlides = async () => {
//       try {
//         const response = await fetch('https://hridayam.dasoclothings.in/api/VideoBannersforUser');
//         const result = await response.json();
//         console.log('Fetched result:', result);

//         if (result.status && Array.isArray(result.data)) {
//           setSlides(result.data);
//         } else {
//           console.error('Invalid data structure:', result);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchSlides();
//   }, []);

//   return (
//     <div style={{ marginTop: '-75rem', backgroundColor: '#9CA5C3', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', width: '100%' }}>
//       <Swiper navigation={true} modules={[Navigation]} style={{ width: '80%', height: '80%' }}>
//         {slides.length > 0 ? (
//           slides.map((slide, index) => (
//             <SwiperSlide key={index}>
//               {slide.image ? (
//                 <img
//                   src={slide.image}
//                   alt={`Slide ${index + 1}`}
//                   style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                   onError={(e) => {
//                     console.error(`Error loading image: ${slide.image}`);
//                     e.target.style.display = 'none'; // Hide broken image
//                   }}
//                 />
//               ) : (
//                 `Slide ${index + 1}`
//               )}
//             </SwiperSlide>
//           ))
//         ) : (
//           <SwiperSlide>Loading...</SwiperSlide>
//         )}
//       </Swiper>
//     </div>
//   );
// }
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default function App() {
  return (
    <div style={{ marginTop: '-75rem', backgroundColor: '#9CA5C3', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', width: '100%' }}>
      <Swiper navigation={true} modules={[Navigation]} style={{ width: '80%', height: '80%' }}>
        <SwiperSlide><img src='https://i.pinimg.com/564x/1b/b1/07/1bb107c905f8ea0f7c9b370b88b2580d.jpg' alt="Slide 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/></SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </div>
  );
}

