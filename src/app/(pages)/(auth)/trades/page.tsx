'use client';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

// module imports
import AuthNavbar from '@/app/(pages)/(auth)/authNavbar';
import { tertiaryHeading } from '@/globals/tailwindvariables';
import PrimaryHeading from '@/app/component/headings/primary';
import TradeData from '@/app/constants/TradesData.json';
import Button from '@/app/component/customButton/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { addSelectedTrades } from '@/redux/authSlices/auth.thunk';
import { isEmpty } from 'lodash';

const Trades = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();

  const auth = useSelector((state: RootState) => state.auth);
  const { user: userData } = auth;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeCollapse, setActiveCollapse] = useState<number | null>(null);
  const [selectedTabs, setSelectedTabs] = useState<Record<string, string[]>>(
    {}
  );

  const toggleCollapse = (index: number) => {
    setActiveCollapse((prevActiveCollapse) =>
      prevActiveCollapse === index ? null : index
    );
  };

  const toggleTab = (heading: string, tabName: string) => {
    setSelectedTabs((prevSelectedTabs) => {
      const updatedTabs = { ...prevSelectedTabs };
      if (updatedTabs[heading]) {
        if (updatedTabs[heading].includes(tabName)) {
          updatedTabs[heading] = updatedTabs[heading].filter(
            (tab) => tab !== tabName
          );
        } else {
          updatedTabs[heading] = [...updatedTabs[heading], tabName];
        }
      } else {
        updatedTabs[heading] = [tabName];
      }
      return updatedTabs;
    });
  };

  console.log('selectedTabs', selectedTabs);

  const submitHandler = () => {
    setIsLoading(true);
    if (isEmpty(selectedTabs)) {
      router.push('/plans');
    } else {
      const payload = {
        userId: userData?.user?._id,
        selectedTrades: selectedTabs,
      };
      dispatch(addSelectedTrades(payload))
        .unwrap()
        .then(() => {
          router.push('/verification');
          setIsLoading(false);
        })
        .catch((err: any) => {
          console.log('err', err);
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <AuthNavbar />
      <div className="h-[calc(100vh-100px)] mt-2 grid place-items-center">
        <div className="w-full max-w-xl ">
          <h2 className={twMerge(`${tertiaryHeading} mb-2`)}>Trades</h2>
          <div className="w-full h-1 bg-mistyWhite"></div>
          <div className="mt-6 bg-white rounded-lg shadow-tertiaryMystery p-10">
            <PrimaryHeading
              title="Select Trades"
              className="text-center mb-12"
            />
            <div
              id="accordion-flush"
              data-accordion="collapse"
              data-active-classes="bg-white text-gray-900 dark:text-white"
              data-inactive-classes="text-gray-500 dark:text-gray-400"
            >
              {TradeData.map((data, index) => (
                <div key={index}>
                  <h2 id={`accordion-flush-heading-${index}`} className="mb-2">
                    <button
                      type="button"
                      className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3 bg-white"
                      data-accordion-target={`#accordion-flush-body-${index}`}
                      aria-expanded={
                        activeCollapse === index ? 'true' : 'false'
                      }
                      aria-controls={`accordion-flush-body-${index}`}
                      onClick={() => toggleCollapse(index)}
                    >
                      <h6 className="text-gray-700">
                        {data.heading}{' '}
                        <span
                          className={`text-gray-500 ms-3 ${selectedTabs[data.heading] &&
                            selectedTabs[data.heading].length > 0
                            ? ''
                            : 'hidden'
                            }`}
                        >
                          {selectedTabs[data.heading] &&
                            selectedTabs[data.heading].length}{' '}
                          selected
                        </span>
                      </h6>
                      <svg
                        data-accordion-icon
                        className={`w-4 h-4 transform ${activeCollapse === index ? 'rotate-0' : '-rotate-180'
                          }`}
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M6 8l4 4 4-4"
                          stroke="gray"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </h2>
                  <div
                    id={`accordion-flush-body-${index}`}
                    className={`${activeCollapse === index ? 'block' : 'hidden'
                      }`}
                    aria-labelledby={`accordion-flush-heading-${index}`}
                  >
                    <div className="flex flex-wrap">
                      {data.tabs.map((tab, tabIndex) => (
                        <div
                          key={tabIndex}
                          className={`border rounded-full p-3 mr-2 mb-2 flex text-gray-500 items-center cursor-pointer ${selectedTabs[data.heading] &&
                            selectedTabs[data.heading].includes(tab.name)
                            ? 'foundation-primary-400'
                            : ''
                            }`}
                          onClick={() => toggleTab(data.heading, tab.name)}
                        >
                          <span>{tab.name}</span>
                          {selectedTabs[data.heading] &&
                            selectedTabs[data.heading].includes(tab.name) ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 ml-1 text-red-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="gray"
                              onClick={() => toggleTab(data.heading, tab.name)}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 ml-1 text-green-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="gray"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button
            isLoading={isLoading}
            onClick={submitHandler}
            text="Submit"
            className={`w-full my-3 ${isLoading ? 'disabled' : ''}`}
            type="submit"
          />
        </div>
      </div>
    </>
  );
};

export default Trades;
