import NoData from './components/NoData';
import Records from './components/records';
import { takeoffRecords } from './data';
const TakeOff = () => {
  return (
    <section className="md:px-16 px-10 pt-6 pb-2">
      {takeoffRecords.length < 0 ? <Records /> : <NoData />}
    </section>
  );
};

export default TakeOff;
