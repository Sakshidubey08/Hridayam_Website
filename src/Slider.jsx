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
