import Image from 'next/image';
import React from 'react';

interface DataType {
  pageLabel: string;
  author: string;
  date: string;
  status: string;
  color: string;
  layer: string;
  space: string;
  value: string;
}

interface Props {
  image: any;
  data?: DataType;
}

const ReportCard: React.FC<Props> = ({ image, data }) => {
  return (
    <div className="flex flex-row justify-between p-2 rounded-lg border-2 h-40 border- ">
      <Image className="w-11 h-11" src={image} alt="img" />
      <div className="flex flex-col">
        <div className=" text-xs ">
          {`Page Label ${data?.pageLabel ?? '---'}`}
        </div>
        <div className="text-xs"> {`Author ${data?.author ?? '---'}`} </div>
        <div className="text-xs"> {`Date ${data?.date ?? '---'}`} </div>
        <div className="text-xs"> {`Status ${data?.status ?? '---'}`} </div>
        <div className="text-xs"> {`Color ${data?.color ?? '---'}`} </div>
        <div className="text-xs"> {`Layer ${data?.layer ?? '---'}`} </div>
        <div className="text-xs"> {`Space ${data?.space ?? '---'}`} </div>
        <div className="text-xs"> {`Value ${data?.value ?? '---'}`} </div>
      </div>
    </div>
  );
};

export default ReportCard;
