'use client';
import { takeoffSummaryService } from '@/app/services/takeoffSummary.service';
import { useEffect, useState } from 'react';
import NoData from './components/NoData';
import Records from './components/records';
import { takeoffRecords } from './data';
const TakeOff = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Define an async function to fetch your data
    const fetchData = async () => {
      try {
        // Call your API here; adjust parameters as needed
        const response =
          await takeoffSummaryService.httpGetAllTakeoffSummaries(/* userId, page, limit */);
        if (response && response.data) {
          // Map your data to match the DataType structure
          const formattedData = response.data.map(
            (
              item: {
                id: any;
                name: any;
                scope: { toString: () => any };
                createdAt: any;
              },
              index: any
            ) => ({
              key: item.id, // Assume each item has a unique id
              name: item.name,
              scope: item.scope.toString(), // Ensure scope is a string
              createdAt: item.createdAt,
              action: 'icon', // Replace with actual action logic
            })
          );
          console.warn(formattedData);

          setData(formattedData);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount
  return (
    <section className="md:px-16 px-10 pt-6 pb-2">
      {data.length > 0 ? <Records /> : <NoData />}
    </section>
  );
};

export default TakeOff;
