import Welcome from '@/app/(pages)/(auth)/welcome';

type Props = {
  children: React.ReactNode;
};

const WelcomeWrapper = ({ children }: Props) => {
  return (
    <div className="h-[100vh] relative grid grid-cols-1 md:grid-cols-2 overflow-y-auto">
      <div className="px-14 py-7">{children}</div>
      <div
        className="items-center relative  bg-cloudWhite
       hidden md:flex h-full"
      >
        <Welcome />
      </div>
    </div>
  );
};

export default WelcomeWrapper;
