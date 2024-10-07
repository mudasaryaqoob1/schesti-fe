import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

const ServiceSlider = () => {
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
      <div className="container flex flex-row items-center justify-between ">
      <div className="flex flex-col  max-w-[540px]">
        <div>
          <Image
            src="/images/services-coma.png"
            width={43}
            height={31}
            alt=" "
            className=""
          />
          <div className="mt-[127px]">
            <Image
              src="/images/services-stars.png"
              width={123}
              height={19}
              alt=" "
              className=""
            />
          </div>
          <div className="font-Gilroy font-medium text-[19px] leading-[32px] text-[#161C2D] opacity-70 mt-[50px]">
            “Lorem ipsum dolor sit amet consectetur. Eget consectetur in vivamus
            arcu. Velit sed libero libero imperdiet lacus nibh aliquam posuere.
            Neque”
          </div>
          <div className="flex flex-col gap-3 mt-6 sm:flex-row">
            <div className="font-bold font-Gilroy text-[17px] leading-[29px] -tracking-[0.2] text-[#007AB6]">
              Maria José Botín
            </div>
            <div className="font-regular font-Gilroy text-[17px] leading-[29px] -tracking-[0.2] text-[#007AB6]">
              Interior Designer
            </div>
          </div>{' '}
        </div>
      </div>
      <div>
        <Image
          src="/images/services-image15.png"
          width={389}
          height={500}
          alt=" "
          className=""
        />
      </div>
    </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="container flex flex-row items-center justify-between ">
      <div className="flex flex-col  max-w-[540px]">
        <div>
          <Image
            src="/images/services-coma.png"
            width={43}
            height={31}
            alt=" "
            className=""
          />
          <div className="mt-[127px]">
            <Image
              src="/images/services-stars.png"
              width={123}
              height={19}
              alt=" "
              className=""
            />
          </div>
          <div className="font-Gilroy font-medium text-[19px] leading-[32px] text-[#161C2D] opacity-70 mt-[50px]">
            “Lorem ipsum dolor sit amet consectetur. Eget consectetur in vivamus
            arcu. Velit sed libero libero imperdiet lacus nibh aliquam posuere.
            Neque”
          </div>
          <div className="flex flex-col gap-3 mt-6 sm:flex-row">
            <div className="font-bold font-Gilroy text-[17px] leading-[29px] -tracking-[0.2] text-[#007AB6]">
              Maria José Botín
            </div>
            <div className="font-regular font-Gilroy text-[17px] leading-[29px] -tracking-[0.2] text-[#007AB6]">
              Interior Designer
            </div>
          </div>{' '}
        </div>
      </div>
      <div>
        <Image
          src="/images/services-image15.png"
          width={389}
          height={500}
          alt=" "
          className=""
        />
      </div>
    </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="container flex flex-row items-center justify-between ">
      <div className="flex flex-col  max-w-[540px]">
        <div>
          <Image
            src="/images/services-coma.png"
            width={43}
            height={31}
            alt=" "
            className=""
          />
          <div className="mt-[127px]">
            <Image
              src="/images/services-stars.png"
              width={123}
              height={19}
              alt=" "
              className=""
            />
          </div>
          <div className="font-Gilroy font-medium text-[19px] leading-[32px] text-[#161C2D] opacity-70 mt-[50px]">
            “Lorem ipsum dolor sit amet consectetur. Eget consectetur in vivamus
            arcu. Velit sed libero libero imperdiet lacus nibh aliquam posuere.
            Neque”
          </div>
          <div className="flex flex-col gap-3 mt-6 sm:flex-row">
            <div className="font-bold font-Gilroy text-[17px] leading-[29px] -tracking-[0.2] text-[#007AB6]">
              Maria José Botín
            </div>
            <div className="font-regular font-Gilroy text-[17px] leading-[29px] -tracking-[0.2] text-[#007AB6]">
              Interior Designer
            </div>
          </div>{' '}
        </div>
      </div>
      <div>
        <Image
          src="/images/services-image15.png"
          width={389}
          height={500}
          alt=" "
          className=""
        />
      </div>
    </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="container flex flex-row items-center justify-between ">
      <div className="flex flex-col  max-w-[540px]">
        <div>
          <Image
            src="/images/services-coma.png"
            width={43}
            height={31}
            alt=" "
            className=""
          />
          <div className="mt-[127px]">
            <Image
              src="/images/services-stars.png"
              width={123}
              height={19}
              alt=" "
              className=""
            />
          </div>
          <div className="font-Gilroy font-medium text-[19px] leading-[32px] text-[#161C2D] opacity-70 mt-[50px]">
            “Lorem ipsum dolor sit amet consectetur. Eget consectetur in vivamus
            arcu. Velit sed libero libero imperdiet lacus nibh aliquam posuere.
            Neque”
          </div>
          <div className="flex flex-col gap-3 mt-6 sm:flex-row">
            <div className="font-bold font-Gilroy text-[17px] leading-[29px] -tracking-[0.2] text-[#007AB6]">
              Maria José Botín
            </div>
            <div className="font-regular font-Gilroy text-[17px] leading-[29px] -tracking-[0.2] text-[#007AB6]">
              Interior Designer
            </div>
          </div>{' '}
        </div>
      </div>
      <div>
        <Image
          src="/images/services-image15.png"
          width={389}
          height={500}
          alt=" "
          className=""
        />
      </div>
    </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default ServiceSlider;
