import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

const HomePageSlider = () => {
  return (
    <Swiper
      modules={[Navigation, A11y]}
      spaceBetween={50}
      slidesPerView={1} // Set to 1 to show one slide at a time
      navigation
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>
        <div className=" flex justify-center mx-4 pt-10 md:pt-14 lg:pt-0 sm:px-6 md:px-8 lg:px-16">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/images/sliderpic.png"
              width={767}
              height={463}
              alt="slider image"
              className="rounded-sm w-full max-w-[767px]"
            />
            <div className="max-w-[540px] font-Gilroy font-regular leading-[34px] text-xl md:text-[24px] -tracking-[0.5px] text-[#1A202C] text-center mt-10 px-4">
              “Lorem ipsum dolor sit amet consectetur. Eget consectetur in
              vivamus arcu. Velit sed libero libero imperdiet lacus nibh aliquam
              posuere. Neque”
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6 px-4">
              <div className="font-bold  font-Gilroy text-[17px] leading-[29px] -tracking-[0.2] text-[#007AB6]">
                Maria José Botín
              </div>
              <div className="font-regular font-Gilroy text-[17px] leading-[29px] -tracking-[0.2] text-[#007AB6]">
                Interior Designer
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className=" flex justify-center mx-4 pt-10 md:pt-14 lg:pt-0 sm:px-6 md:px-8 lg:px-16">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/images/sliderpic.png"
              width={767}
              height={463}
              alt="slider image"
              className="rounded-lg w-full max-w-[767px]"
            />
            <div className="max-w-[600px] w-full font-Gilroy font-regular leading-[34px] text-xl md:text-[24px] -tracking-[0.5px] text-[#1A202C] text-center mt-10 ">
              “Lorem ipsum dolor sit amet consectetur. Eget consectetur in
              vivamus arcu. Velit sed libero libero imperdiet lacus nibh aliquam
              posuere. Neque”
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6 px-4">
              <div className="font-bold font-Gilroy text-[17px] leading-[29px] -tracking-[0.2] text-[#007AB6]">
                Maria José Botín
              </div>
              <div className="font-regular font-Gilroy text-[17px] leading-[29px] -tracking-[0.2] text-[#007AB6]">
                Interior Designer
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className=" flex justify-center mx-4 pt-10 md:pt-14 lg:pt-0 sm:px-6 md:px-8 lg:px-16">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/images/sliderpic.png"
              width={767}
              height={463}
              alt="slider image"
              className="rounded-sm w-full max-w-[767px]"
            />
            <div className="max-w-[540px] font-Gilroy font-regular leading-[34px] text-xl md:text-[24px] -tracking-[0.5px] text-[#1A202C] text-center mt-10 px-4">
              “Lorem ipsum dolor sit amet consectetur. Eget consectetur in
              vivamus arcu. Velit sed libero libero imperdiet lacus nibh aliquam
              posuere. Neque”
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6 px-4">
              <div className="font-bold font-Gilroy text-[17px] leading-[29px] -tracking-[0.2] text-blue">
                Maria José Botín
              </div>
              <div className="font-regular font-Gilroy text-[17px] leading-[29px] -tracking-[0.2] text-blue">
                Interior Designer
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className=" flex justify-center mx-4 pt-10 md:pt-14 lg:pt-0 sm:px-6 md:px-8 lg:px-16">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/images/sliderpic.png"
              width={767}
              height={463}
              alt="slider image"
              className="rounded-sm w-full max-w-[767px]"
            />
            <div className="max-w-[540px] font-Gilroy font-regular leading-[34px] text-xl md:text-[24px] -tracking-[0.5px] text-[#1A202C] text-center mt-10 px-4">
              “Lorem ipsum dolor sit amet consectetur. Eget consectetur in
              vivamus arcu. Velit sed libero libero imperdiet lacus nibh aliquam
              posuere. Neque”
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6 px-4">
              <div className="font-bold font-Gilroy text-[17px] leading-[29px] -tracking-[0.2] text-blue">
                Maria José Botín
              </div>
              <div className="font-regular font-Gilroy text-[17px] leading-[29px] -tracking-[0.2] text-blue">
                Interior Designer
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HomePageSlider;
