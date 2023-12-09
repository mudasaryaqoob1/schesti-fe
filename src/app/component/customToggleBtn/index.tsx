"use client"
import { useState, FC } from 'react'
import { quaternaryHeading } from "@/globals/tailwindvariables";
interface ToggleBtnProps {
  onChange: (isChecked: boolean) => void;
}
const Index: FC<ToggleBtnProps> = ({ onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);
    onChange(newIsChecked); // Notify the parent component about the change
  };
  return (
    <div className=" min-w-[350px] h-14">
      <label htmlFor="Toggle3" className="inline-flex gap-4  bg-cloudWhite items-center justify-center cursor-pointer dark:text-gray-800 rounded-xl w-full h-full p-1">
        <input id="Toggle3" type="checkbox" className="hidden peer" onChange={handleToggle} checked={isChecked} />
        <span className={`px-4 py-2 rounded-l-md dark:bg-lavenderPurple peer-checked:dark:bg-cloudWhite flex-1 text-center
        dark:text-nastyWhite peer-checked:dark:text-ebonyGray h-full
        grid place-items-center ${quaternaryHeading} font-medium 
        `}>Individual Plan</span>
        <span className={`px-4 py-2 rounded-r-md dark:bg-cloudWhite peer-checked:dark:bg-lavenderPurple flex-1 text-center
        peer-checked:dark:text-nastyWhite  h-full grid place-items-center
        ${quaternaryHeading} font-medium 
        `}>Enterprise Plan</span>
      </label>
    </div>
  );
};

export default Index;
