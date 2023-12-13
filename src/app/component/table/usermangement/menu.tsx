'use client';
import { quinaryHeading } from '@/globals/tailwindvariables';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
interface Props {
  className?: string;
  clientID: number;
}
const Menu = ({ className }: Props) => {
  const router = useRouter();
  const handleEdit = () => {
    router.push('/createclient');
  };
  return (
    <div
      className={twMerge(`flex flex-col p-4 
    shadow-tertiaryMystery3  rounded-lg bg-snowWhite gap-3
    border border-nebulaGray 
    ${className}`)}
    >
      <p
        className={`text-graphiteGray  hover:underline 
        ${quinaryHeading}
        `}
      >
        Create estimate request
      </p>
      <p
        className={`text-graphiteGray  hover:underline 
        ${quinaryHeading}
        `}
      >
        Create Schedule
      </p>

      <p
        className={`text-graphiteGray 
        hover:bg-green-600 hover:text-snowWhite rounded-sm  hover:text-center
        active:border hover:underline active:border-blue-600 ${{
          quinaryHeading,
        }}`}
        onClick={() => router.push('/createclient')}
      >
        Create new invoice
      </p>
      <p
        className={`text-graphiteGray active:border hover:underline active:border-blue-600
        active:bg-red-600 active:text-blue-600
        hover:bg-red-600 hover:text-snowWhite rounded-sm hover:text-center active:text-center
        ${quinaryHeading}
        `}
        onClick={() => handleEdit()}
      >
        Edit client details
      </p>
      <p
        className={`text-graphiteGray active:border hover:underline active:bg-red-600 active:text-blue-600
        hover:bg-red-600 hover:text-snowWhite rounded-sm hover:text-center active:text-center
        ${quinaryHeading}
        `}
      >
        Delete
      </p>
    </div>
  );
};

export default Menu;
