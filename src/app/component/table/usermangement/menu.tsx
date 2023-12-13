'use client';
import Paragraph from '@/app/component/customParagraph/paragraph';
import { useAppDispatch } from '@/app/hooks/hooks';
import { quinaryHeading } from '@/globals/tailwindvariables';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
interface Props {
  className?: string;
  clientID: number;
}
const Menu = ({ className, clientID }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleEdit = (id: any) => {
    router.push('/createclient');
  };
  return (
    <div
      className={twMerge(`flex flex-col p-4 
    shadow-tertiaryMystery3  rounded-lg bg-snowWhite gap-3
    border border-nebulaGray 
    ${className}`)}
    >
      <Paragraph
        title="Create estimate request"
        styledVars={quinaryHeading}
        classes="text-graphiteGray active:border hover:underline active:border-blue-600"
      />
      <Paragraph
        title="Create Schedule"
        styledVars={quinaryHeading}
        classes="text-graphiteGray active:border hover:underline active:border-blue-600"
      />
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
        onClick={() => handleEdit(clientID)}
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
