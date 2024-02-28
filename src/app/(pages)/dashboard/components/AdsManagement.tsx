import { adService } from '@/app/services/ad-management.service';
import { Carousel, Skeleton } from 'antd';
import moment from 'moment';
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

  if (!adsQuery.data?.data) {
    return null;
  }

  // filter ads that are between startDate and endDate using moment.js
  const filteredAds = adsQuery.data.data.ads.filter(ad => {
    const startDate = moment(ad.startDate);
    const expiryDate = moment(ad.expiryDate);
    const current = moment();
    return current.isBetween(startDate, expiryDate);
  });

  return (
    <Carousel
      autoplay={true}
      autoplaySpeed={calculateAutoplaySpeed(filteredAds[currentSlide]?.duration)}
      afterChange={handleSlideChange}
      effect="fade" style={{ height: 250, width: '100%' }}
    // dots={false}
    >
      {adsQuery.data?.data!.ads.map((item) => {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt="AdsManagement"
            src={item.imageURL}
            className="rounded-md w-full h-56 shadow-md  border"
            key={item._id}
          />
        );
      })}
    </Carousel>
  );
}
