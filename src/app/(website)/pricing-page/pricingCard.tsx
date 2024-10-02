import React from 'react';

// Defining the props interface
interface PricingCardProps {
  title: string;
  price: number;
  features: string[];
  buttonText: string;
}

// Using the PricingCardProps interface for typing the component props
const PricingCard: React.FC<PricingCardProps> = ({ title, price, features, buttonText }) => {
  return (
    <div className="bg-white rounded-[18.06px] shadow-[0px_0px_62.45px_0px_#373C4F1C] max-w-[363px] mx-auto p-[29px]">
      <h3 className="text-xl font-semibold mb-[21.67px]">{title}</h3>
      <div className="text-4xl font-bold text-yellow-500 mb-[21.67px]">
        <span className="text-black">$</span>{price}
        <span className="text-sm font-normal">/Month</span>
      </div>
      <p className="text-gray-500 mb-[29px]">All the basics for businesses that are just getting started.</p>
      
      <div className="border-t border-[#0000001A] my-4"></div>
      
      <h4 className="font-medium mt-[47px]">Features</h4>
      <ul className="space-y-2  h-[301px]">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <input type="checkbox" checked={true} className="form-checkbox text-blue-600" readOnly />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button className=" w-full bg-blue text-white rounded-[7.22px] py-2 px-6 hover:bg-blue-500 transition duration-300">
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;
