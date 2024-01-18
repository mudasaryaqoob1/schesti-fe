import { bg_style } from '@/globals/tailwindvariables';
import SettingSidebar from '../verticleBar';
import Materials from './components/Materials';

const page = () => {
  return (
    <SettingSidebar>
      <section className={`${bg_style} p-5 w-full`}>
        <Materials />
      </section>
    </SettingSidebar>
  );
};

export default page;
