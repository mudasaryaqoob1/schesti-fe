'use client';
import Button from '@/app/component/customButton/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface props {
  login?: boolean;
  socialicons?: boolean;
}

const NavBar = ({ login, socialicons }: props) => {
  const router = useRouter();
  return (
    <div
      className={`w-full  flex h-16 items-center justify-between
    ${login ? 'shadow-quinary' : ''}
    ${socialicons ? 'bg-primaryGradient' : ''}
    `}
    >
      {!socialicons && (
        <Image
          className="cursor-pointer"
          src={'/logo.svg'}
          alt="logo website"
          width={100}
          height={30}
          onClick={() => router.push('/')}
        />
      )}
      {socialicons && (
        <Image
          className="cursor-pointer"
          src={'/logowhite.svg'}
          alt="logo website"
          width={100}
          height={100}
          onClick={() => router.push('/login')}
        />
      )}
      <div className="">
        {login && (
          <Button
            text="Login"
            className="!py-2 !px-7 cursor-pointer"
            onClick={() => router.push('/login')}
          />
        )}
      </div>
      {socialicons && (
        <div className="flex gap-3 items-center">
          <Image
            src={'/FB.svg'}
            alt="facbook icon"
            width={20}
            height={20}
            className="cursor-pointer"
          />
          <Image
            src={'/IG.svg'}
            alt="insta icon"
            width={20}
            height={20}
            className="cursor-pointer"
          />
          <Image
            src={'/Twitter.svg'}
            alt="Twitter icon"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default NavBar;
