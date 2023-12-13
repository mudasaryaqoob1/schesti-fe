'use client';
import { useState } from 'react';
import { tertiaryHeading } from '@/globals/tailwindvariables';
interface SwitchBtnProps {
  onChange: (isYearly: boolean) => void;
}
const Index: React.FC<SwitchBtnProps> = ({ onChange }) => {
  const [isYearly, setIsYearly] = useState(false);
  const handleSwitch = () => {
    setIsYearly(!isYearly);
    onChange(!isYearly);
  };
  return (
    <label
      htmlFor="Toggle1"
      className="inline-flex gap-6 items-center space-x-4 cursor-pointer dark:text-gray-100"
    >
      <span className={`${tertiaryHeading} font-normal`}>Monthly</span>
      <span className="relative">
        <input
          id="Toggle1"
          type="checkbox"
          className="hidden peer"
          checked={isYearly}
          onChange={handleSwitch}
        />
        <div className="w-16 h-8 rounded-full shadow-inner dark:bg-greenishGreen peer-checked:dark:bg-primaryGradient py-1 px-2 "></div>
        <div className="absolute inset-y-0 left-0 w-6 h-6 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto dark:bg-snowWhite"></div>
      </span>
      <span className={`${tertiaryHeading} font-normal`}>Yearly</span>
    </label>
  );
};

export default Index;
