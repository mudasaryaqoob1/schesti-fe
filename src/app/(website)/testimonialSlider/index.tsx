'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import TestimonialCard from '../components/testimonialCard';
import TestimonialData from '@/app/constants/testimonials.json';

interface IProps {
  slidesPerView?: number;
}
function ExperienceSlider({ slidesPerView = 3.06 }: IProps) {
  return (
    <>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={20}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1220: {
            slidesPerView: slidesPerView,
            spaceBetween: 10,
          },
        }}
        modules={[]}
      
        className="mySwiper"
      >
     {TestimonialData.map((testimonials: any) => (
  <SwiperSlide
    key={testimonials.key} // Correctly placed the key attribute here
    className="bg-white h-[361px] rounded-[16px] w-full max-w-[346.5px] shadow-[0px_0px_40px_0px_rgba(46,45,116,0.1)] py-6"
  >
    <TestimonialCard testimonials={testimonials} />
  </SwiperSlide>
))}


      </Swiper>
    </>
  );
}
export default ExperienceSlider;
  