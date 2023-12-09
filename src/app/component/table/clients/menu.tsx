'use client';
import Paragraph from '@/app/component/customParagraph/paragraph';
import { useAppDispatch } from '@/app/hooks/hooks';
import { deleteClient } from '@/app/redux/clientSlice';
import { quinaryHeading } from '@/globals/tailwindvariables';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
  clientID: number
}
const Menu = ({ className, clientID }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();


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
        classes="text-graphiteGray  hover:underline "
      />
      <Paragraph
        title="Create Schedule"
        styledVars={quinaryHeading}
        classes="text-graphiteGray  hover:underline "
      />
      <p
        className={`text-graphiteGray 
        active:border hover:underline ${{ quinaryHeading }}`}
        onClick={() => router.push('/client/create')}
      >Create new invoice</p>
      <p
        className={`text-graphiteGray  hover:underline 
        ${quinaryHeading}
        `}
        onClick={() => {
          router.push(`client/edit/${clientID}`)
        }}
      >
        Edit client details
      </p>
      <p
        onClick={() => dispatch(deleteClient(clientID))}
        className={`text-graphiteGray  hover:underline 
        ${quinaryHeading}
        `
        }
      >
        Delete
      </p>
    </div>
  );
};

export default Menu;
