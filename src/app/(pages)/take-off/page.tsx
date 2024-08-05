'use client';
import { useEffect, useLayoutEffect } from 'react';
// import NoData from './components/NoData';
import Records from './components/records';
import { AppDispatch } from '@/redux/store';
// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTakeoffSummaries } from '@/redux/takeoffSummaries/takeoffSummaries.thunk';
import NoTakeOff from './components/records/NoTakeOff';
// import InitialUpload from './components/upload/InitialUpload';
// import CreateInfo from './components/upload/CreateInfo';
// import TakeOffNew from './components/scale/TakeOffNew';
import { selectTakeoffSummaries, selectTakeoffSummariesLoading } from '@/redux/takeoffSummaries/takeoffSummaries.Selector';
import { HttpService } from '@/app/services/base.service';
import { selectToken } from '@/redux/authSlices/auth.selector';
// import TakeOffNewPage from './scale/TakeOffNewPage';
// import { selectTakeoffSummaries } from '@/redux/takeoffSummaries/takeoffSummaries.Selector';
const TakeOff = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const summaries = useSelector(selectTakeoffSummaries);

  useEffect(() => {
    dispatch(fetchTakeoffSummaries({ page: 1, limit: 10 }));
  }, []); // Empty dependency array means this effect runs once on mount
  const summaries = useSelector(selectTakeoffSummaries);
  const loading = useSelector(selectTakeoffSummariesLoading);
  console.log(summaries, " Summeries");
  const token = useSelector(selectToken);
  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);
  

  return (
    <section className="md:px-16 px-10 pt-6 pb-2">
      {/* {summaries?.length > 0 ? <Records /> : <></>} */}
      {
        //@ts-ignore
      !loading && (!summaries || !Array.isArray(summaries) || !summaries?.length>0) ? <NoTakeOff /> : <Records />}
      {/* <NoTakeOff /> */}
      {/* <InitialUpload /> */}
      {/* <CreateInfo /> */}
      {/* <TakeOffNew /> */}
      {/* <TakeOffNewPage /> */}
    </section>
  );
};

export default TakeOff;
