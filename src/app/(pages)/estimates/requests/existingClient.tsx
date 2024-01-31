'use client';
import { Fragment, useCallback, useEffect, useState } from 'react';
import Button from '@/app/component/customButton/button';
import Image from 'next/image';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import QuinaryHeading from '@/app/component/headings/quinary';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanyClients } from '@/redux/company/company.thunk';
import {
  selectClients,
  selectClientsLoading,
} from '@/redux/company/companySelector';
import { IClient } from '@/app/interfaces/companyInterfaces/companyClient.interface';

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectClient: (data: IClient) => void;
}

const ExistingClient = ({ setModalOpen, onSelectClient }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const clientLoading = useSelector(selectClientsLoading);
  const clientsData = useSelector(selectClients);
  const [selectedClientId, setSelectedClientId] = useState(
    clientsData?.[0]?._id
  );

  const memoizedSetPerson = useCallback(async () => {
    await dispatch(fetchCompanyClients({ page: 1, limit: 10 }));
  }, []);

  useEffect(() => {
    memoizedSetPerson();
  }, []);

  return (
    <div className="py-2.5 px-6 bg-white border border-solid border-elboneyGray rounded-[4px] z-50">
      <section className="w-full">
        <div className="flex justify-between items-center border-b-Gainsboro ">
          <div>
            <QuaternaryHeading
              title="Existing Clients"
              className="text-graphiteGray font-bold"
            />
            <QuinaryHeading
              title="Select any existing client from here."
              className="text-coolGray"
            />
          </div>
          <Image
            src={'/crossblack.svg'}
            alt="close icon"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={() => setModalOpen(false)}
          />
        </div>
        <div className="rounded-lg border border-Gainsboro bg-silverGray w-[335px] h-[40px] my-5 flex items-center px-3">
          <input
            type="search"
            name=""
            id=""
            placeholder="Search..."
            className="w-full h-full bg-transparent outline-none"
          />
          <Image
            src={'/search.svg'}
            alt="search icon "
            width={16}
            height={16}
            className="cursor-pointer"
          />
        </div>
        {/* Table */}
        <div className="rounded-md border-2 border-lightGrayishBlue h-[50vh] overflow-x-auto">
          <div className="px-4 py-2 border-t-lightGrayishBlue bg-paleGrayishWhite border border-l-lightGrayishBlue">
            <QuinaryHeading
              title="Name"
              className="font-medium text-graphiteGray"
            />
          </div>

          {!clientsData || clientLoading ? (
            <h6 className="text-center">Loading...</h6>
          ) : (
            clientsData.map(({ _id, firstName }: any, i: number) => {
              return (
                <Fragment key={i}>
                  <div className="border-b-lightGrayishBlue p-4 flex gap-4 items-center bg-snowWhite border">
                    <input
                      type="radio"
                      name="client name"
                      id={_id}
                      onChange={() => setSelectedClientId(_id)}
                    />
                    {/* <Image src={img} alt="client icon" width={30} height={30} /> */}
                    <label htmlFor={_id} className="cursor-pointer">
                      <SenaryHeading
                        title={firstName}
                        className="text-darkSteelBlue"
                      />
                    </label>
                  </div>
                </Fragment>
              );
            })
          )}
        </div>
      </section>
      <div className="h-px bg-elboneyGray w-full mt-6"></div>
      <div className="flex justify-end gap-4 mt-5 mb-2">
        <div>
          <Button
            text="Cancel"
            className="!bg-snowWhite !text-abyssalBlack"
            onClick={() => setModalOpen(false)}
          />
        </div>
        <div>
          <Button
            text="Add Client"
            onClick={() => {
              onSelectClient(
                clientsData.find(({ _id }: any) => _id === selectedClientId)
              );
              setModalOpen(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ExistingClient;
