import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default function App() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('https://api.hirdayam.com/api/VideoBannersforUser');
        const result = await response.json();
        console.log('Fetched result:', result);
        
        if (result.status && Array.isArray(result.data)) {
          setSlides(result.data);
          // console.log(slides.data.t+"newrkwelrjlkerlkejr")
        } else {
          console.error('Invalid data structure:', result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSlides();
  }, []);

  return (
    <div className=' bg-gray-500/20 md:bg-[#9CA5C3] h-[200px] md:h-[500px]' style={{ marginTop: '-75rem', backgroundColor: '', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', width: '100%' }}>
      
       
      <Swiper  navigation={true} modules={[Navigation]} style={{ width: '80%', height: '80%' }}>
        {slides.length > 0 ? (
          slides.map((slide, index) => (
            <SwiperSlide className=' rounded-3xl ' key={index}>
           
              {slide.video ? (
              
                <video className='rounded-2xl  ' width={"100px"} height={"100px"} autoPlay muted loop controls={false}
                  // src={"https://www.youtube.com/watch?v=RlPNh_PBZb4"}
                  alt={`Slide ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  // onError={(e) => {
                  //   console.error(`Error loading image: ${slide.video}`);
                  //   e.target.style.display = 'none'; // Hide broken image
                  // }}
                >
                  <source src={slide.video} type='video/mp4'></source>
                </video>

                
                
              ) : (
                `Slide ${index + 1}`
              )}

              
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>Loading...</SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}
// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';

// export default function App() {
//   return (
//     <div className='h-[200px] md:h-[500px] ' style={{ marginTop: '-75rem', backgroundColor: '#9CA5C3',  display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', width: '100%' }}>
//       <Swiper navigation={true} modules={[Navigation]} style={{ width: '80%', height: '80%' }}>
//         <SwiperSlide><img src='https://i.pinimg.com/564x/1b/b1/07/1bb107c905f8ea0f7c9b370b88b2580d.jpg' alt="Slide 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/></SwiperSlide>
//         <SwiperSlide>Slide 2</SwiperSlide>
//         <SwiperSlide>Slide 3</SwiperSlide>
//         <SwiperSlide>Slide 4</SwiperSlide>
//         <SwiperSlide>Slide 5</SwiperSlide>
//         <SwiperSlide>Slide 6</SwiperSlide>
//         <SwiperSlide>Slide 7</SwiperSlide>
//         <SwiperSlide>Slide 8</SwiperSlide>
//         <SwiperSlide>Slide 9</SwiperSlide>
//       </Swiper>
//     </div>
//   );
// }

