import CustomButton from '@/app/component/customButton/white';
import Description from '@/app/component/description';
import { adService } from '@/app/services/ad-management.service';
import { Carousel, Skeleton } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { useQuery } from 'react-query';

export function AdsManagement() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const adsQuery = useQuery(['ads'], () => {
    return adService.httpGetAllAds();
  });

  const handleSlideChange = (current: number) => {
    setCurrentSlide(current);
  };

  const calculateAutoplaySpeed = (duration?: number) => {
    if (!duration) {
      return;
    }
    // Convert duration to milliseconds (assuming duration is in seconds)
    return duration * 1000;
  };

  if (adsQuery.isLoading) {
    return <Skeleton />
  }



  return (
    <Carousel
      autoplay={true}
      autoplaySpeed={calculateAutoplaySpeed(adsQuery.data?.data!.ads[currentSlide]?.duration)}
      afterChange={handleSlideChange}
      effect="fade" style={{ height: 250, width: '100%' }}
      dots={false}
    >
      {adsQuery.data?.data!.ads.map((item) => {
        return (
          <div
            className="w-full h-56 my-6 shadow-md rounded-md bg-gradient-to-r from-[#7A4FF0] to-[#B29BFF] px-10 pt-4"
            key={item._id}
          >
            <div className="grid grid-cols-12 gap-8">
              <div className="space-y-2 col-span-3 flex flex-col items-center">
                <CustomButton
                  text="Thinking of"
                  className="!bg-[#EF9F28] !text-[#F5F6FA] !text-[16px] leading-[20px] !w-40 !rounded-full !border-[#EF9F28]"
                />
                <Description
                  title="buying or selling"
                  className="text-[24px] uppercase leading-[44px] font-semibold text-white"
                />
                <Description
                  title="A Home?"
                  className="text-[54px] uppercase leading-[58px] font-semibold text-white"
                />
              </div>
              <div className="col-span-4">
                <Description
                  title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium quidem vitae quae? Nobis, expedita. Esse error porro sed odio explicabo facilis hic saepe ea animi autem, quaerat a voluptate. Similique!"
                  className="text-[14px] text-white leading-[20px] font-normal"
                />
              </div>
              <div className="space-y-4 col-span-2 flex flex-col items-center">
                <Description
                  title="CALL US TODAY FOR ALL YOUR REAL ESTATE NEEDS"
                  className="text-[14px] text-white leading-[20px] font-normal"
                />
                <CustomButton
                  text="1-000-000-0000"
                  className="!bg-[#EF9F28] !text-[#F5F6FA] !text-[16px] leading-[20px] !w-48 !rounded-full !border-[#EF9F28]"
                />
              </div>
              <div className="col-span-3 flex justify-end">
                <Image
                  alt="AdsManagement"
                  src={item.imageURL}
                  width={250}
                  height={200}
                  className="rounded-md"
                />
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
