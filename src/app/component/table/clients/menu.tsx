'use client';
import { useAppDispatch } from '@/app/hooks/hooks';
import { deleteClient } from '@/app/redux/clientSlice';
import { quinaryHeading } from '@/globals/tailwindvariables';
import { useRouter } from 'next/navigation';

interface Props {
  clientID: number
}
const Menu = ({ clientID }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();


  return (
    <div
      className="flex flex-col p-4 
    shadow-tertiaryMystery3  rounded-lg bg-snowWhite gap-3
    border border-nebulaGray  absolute w-56 h-auto top-[-50px] right-24 z-50"
    >
      <p
        className={`text-graphiteGray 
       hover:underline ${{ quinaryHeading }}`}
      >
        Create estimate request
      </p>

      <p
        className={`text-graphiteGray 
       hover:underline ${{ quinaryHeading }}`}
      >
        Create Schedule
      </p>
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
