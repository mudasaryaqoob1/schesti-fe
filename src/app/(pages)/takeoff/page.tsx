'use client';
import { useEffect } from 'react';
// import NoData from './components/NoData';
import Records from './components/records';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTakeoffSummaries } from '@/redux/takeoffSummaries/takeoffSummaries.thunk';
import { selectTakeoffSummaries } from '@/redux/takeoffSummaries/takeoffSummaries.Selector';
const TakeOff = () => {
  const dispatch = useDispatch<AppDispatch>();
  const summaries = useSelector(selectTakeoffSummaries);

  useEffect(() => {
    dispatch(fetchTakeoffSummaries({ page: 1, limit: 10 }));
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <section className="md:px-16 px-10 pt-6 pb-2">
      {summaries?.length > 0 ? <Records /> : <></>}
    </section>
  );
};

export default TakeOff;
