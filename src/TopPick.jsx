import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import image1 from './images/image 117.png';
import image2 from './images/image118.png';
import image3 from './images/image 118 (1).png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Import required modules
import { Pagination } from 'swiper/modules';

export default function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:'2rem'}}>
      <div style={{ width: "100vw", maxWidth: '80%', height: '30vh', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
        <Swiper
          slidesPerView={3}
          spaceBetween={470}
        
          breakpoints={{
            '@0.75': {
              slidesPerView: 3,
              spaceBetween: 320,
            },
            '@1.00': {
              slidesPerView: 3,
              spaceBetween: 320,
            },
            '@1.50': {
              slidesPerView: 3,
              spaceBetween: 320,
            },
          }}
          modules={[Pagination]}
          className="mySwiper3"
          style={{ width: '100%', height: '100%'}}
        >
          <SwiperSlide style={{ display: 'flex',  justifyContent: 'center', alignItems: 'center' }}>
            <img src={image1} alt="Slide 1" style={{ width: 'auto',  height: '100%',paddingLeft:'400px', borderRadius: '10px' }} />
          </SwiperSlide>
          <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={image2} alt="Slide 2" style={{ width: 'auto', height: '100%',paddingLeft:'320px', borderRadius: '10px' }} />
          </SwiperSlide>
          <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={image3} alt="Slide 3" style={{ width:'auto', height: '100%',paddingLeft:'220px', borderRadius: '10px' }} />
          </SwiperSlide>
          <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={image3} alt="Slide 3" style={{ width:'auto', height: '100%',paddingLeft:'120px', borderRadius: '10px' }} />
          </SwiperSlide>
           
        </Swiper>
      </div>
    </div>
  );
}
