import React from 'react';

 const TestimonialCard = () => {
  return (
    <>
      <div className={`w-full pl-[18px] flex flex-col gap-[24px] `}>
        <div className="">
          <img src="/bxs_quote-left.png" alt="" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-[9px]">
            <div className="">
              <img src="/Avatar.svg" alt="" />
            </div>
            <div className="">
              <div className="font-bold font-font-PlusJakartaSans text-[13.5px] text-[#181D25] leading-[17.01px] ">
                Daianne Barros De Oliveira
              </div>
              <div className="font-normal font-font-PlusJakartaSans text-[12px] text-[#404B5A] leading-[15.12px] ">
                Flooring & Remodeling
              </div>
            </div>
          </div>
          <div className="flex gap-[3px]">
            <div className="flex gap-[3px]">
              <img src="/Star.svg" alt="" />
              <img src="/Star.svg" alt="" />
              <img src="/Star.svg" alt="" />
              <img src="/Star.svg" alt="" />
              <img src="/Star.svg" alt="" />
            </div>
            <div className="font-normal font-sans text-[12px] text-[#404B5A] leading-[15.12px]">
              <h1>5 stars</h1>
            </div>
          </div>
        </div>

        <div className="font-medium font-PlusJakartaSans text-[13.5px] text-[#000000B2] leading-[24px] italic w-full max-w-[310.5px]">
          <p>
            “Boostly Digital Workplace passar bra för företag som oss, vi har en
            transaktion per halvminut och den måste vara snabb. Det är enkelt
            att använda och säkert att all information läggs i molnet, och de
            har låga transaktionsavgifter jämfört med andra
            <br /> tjänster”
          </p>
        </div>
      </div>
    </>
  );
};


export default TestimonialCard