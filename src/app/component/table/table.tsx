'use client';
import { twMerge } from 'tailwind-merge';
import { senaryHeading } from '@/globals/tailwindvariables';

import Image from 'next/image';
interface Props {
  headings: string[];
  clientData: {
    id: number
    name?: string;
    company?: string
    email?: string;
    phoneNumber?: string;
    address?: string;
    status?: string;
    ProjectName?: string;
    ClientName?: string;
    Number?: string;
    City?: string;
  }[];
  requestsData?: {
    Status?: string;
    ProjectName?: string;
    ClientName?: string;
    Number?: string;
    City?: string;
    Estimator?: string;
    SalePerson?: string;
  }[];
}
const Table = ({ headings, requestsData }: Props) => {


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-cosmicGray  dark:text-gray-400">
          {/* <tr>
            <th scope="col" className="px-6 py-3">
              client name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone number
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr> */}
          <tr>
            {headings?.map((heading, i) => {
              return (
                <th scope="col" className="px-6 py-3" key={i}>
                  {heading}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {/* {clientsDate?.length &&
            clientsDate?.map(
              ({ id, name, company, email, phoneNumber, status, address }, i) => {
                return (
                  <tr key={id}>
                    <td
                      className={twMerge(
                        `${senaryHeading} text-slateGray px-6 py-4
                        border-0  border-solid border-nebulaGray border-b
                        `
                      )}
                    >
                      {name}
                    </td>
                    <td
                      className={twMerge(
                        `${senaryHeading} text-slateGray px-6 py-4
                        border-0  border-solid border-nebulaGray border-b
                        `
                      )}
                    >
                      {company}
                    </td>
                    <td
                      className={twMerge(
                        `${senaryHeading} text-slateGray px-6 py-4
                        border-0  border-solid border-nebulaGray border-b
                        `
                      )}
                    >
                      {email}
                    </td>
                    <td
                      className={twMerge(
                        `${senaryHeading} text-slateGray px-6 py-4
                        border-0  border-solid border-nebulaGray border-b
                        `
                      )}
                    >
                      {phoneNumber}
                    </td>
                    <td
                      className={twMerge(
                        `${senaryHeading} text-slateGray px-6 py-4
                      border-0  border-solid border-nebulaGray border-b
                      `
                      )}
                    >{address}</td>
                    <td
                      className={twMerge(
                        `${senaryHeading} text-slateGray px-6 py-4
                        border-0  border-solid border-nebulaGray border-b
                        `
                      )}
                    >
                      <a
                        href="#"
                        className="font-medium
                        text-emeraldGreen hover:underline
                        mix-blend-multiply rounded-2xl bg-mintGreen px-4 py-2
                        "
                      >
                        {status}
                      </a>
                    </td>
                    <td
                      className={twMerge(`${senaryHeading} text-slateGray px-6 py-4 cursor-pointer relative
                      border-0  border-solid border-nebulaGray border-b
                    `)}
                    >
                      <Image
                        src="/moreOptions.svg"
                        alt="action"
                        width={20}
                        height={20}
                        onClick={() => toggleMenu(i)}
                      />
                      {openMenuIndex === i && (
                        <Menu className="absolute w-56 h-auto top-[-146px ] right-24 z-50"
                          clientID={id} deleteHandle={deleteHandle}
                        />
                      )}
                    </td>
                  </tr>
                );
              }
            )} */}

          {requestsData?.length &&
            requestsData?.map(
              (
                {
                  ProjectName,
                  ClientName,
                  Estimator,
                  City,
                  SalePerson,
                  Number,
                  Status,
                },
                i
              ) => {
                return (
                  <tr key={i}>
                    <td
                      className={twMerge(
                        `${senaryHeading} text-slateGray px-6 py-4`
                      )}
                    >
                      {ProjectName}
                    </td>
                    <td
                      className={twMerge(
                        `${senaryHeading} text-slateGray px-6 py-4`
                      )}
                    >
                      {ClientName}
                    </td>
                    <td
                      className={twMerge(
                        `${senaryHeading} text-slateGray px-6 py-4`
                      )}
                    >
                      {Number}
                    </td>
                    <td
                      className={twMerge(
                        `${senaryHeading} text-slateGray px-6 py-4`
                      )}
                    >
                      {City}
                    </td>
                    <td
                      className={twMerge(
                        `${senaryHeading} text-slateGray px-6 py-4`
                      )}
                    >
                      {SalePerson}
                    </td>
                    <td
                      className={twMerge(
                        `${senaryHeading} text-slateGray px-6 py-4`
                      )}
                    >
                      {Estimator}
                    </td>
                    <td
                      className={twMerge(
                        `${senaryHeading} text-slateGray px-6 py-4`
                      )}
                    >
                      <a
                        href="#"
                        className="font-medium
                        text-emeraldGreen hover:underline
                        mix-blend-multiply rounded-2xl bg-mintGreen px-4 py-2
                        "
                      >
                        {Status}
                      </a>
                    </td>

                    <td
                      className={twMerge(`${senaryHeading} text-slateGray px-6 py-4 cursor-pointer relative
                   
                    `)}
                    >
                      <Image
                        src="/moreOptions.svg"
                        alt="action"
                        width={20}
                        height={20}
                      // onClick={() => toggleMenu(i)}
                      />
                      {/* {showMenu[i] && (
                      <Menu className="absolute w-56 h-auto top-1 right-24 z-50" />
                    )} */}
                    </td>
                  </tr>
                );
              }
            )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
