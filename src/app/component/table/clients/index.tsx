'use client';
import { senaryHeading } from '@/globals/tailwindvariables';
// import Menu from './menu';
import Image from 'next/image';
interface Props {
  headings: string[];
  clients: any;
}
const Index = ({ headings, clients }: Props) => {
  // const [openMenuIndex, setOpenMenuIndex] = useState<number>(-1);

  // const toggleMenu = (index: number) => {
  //   setOpenMenuIndex((prevIndex) => (prevIndex === index ? -1 : index));
  // };

  console.log(clients, 'clientsclients');

  return (
    <div className="!rounded-lg md:overflow-hidden overflow-x-auto">
      <table className="mt-4 w-full border-solid table-auto border-graylittle border h-full rounded-xl bg-snowWhite">
        <thead className="bg-cosmicGray">
          <tr>
            {headings?.map((heading, i) => {
              return (
                <th
                  scope="col"
                  className={`px-4 py-3 text-start !rounded-tl-12 !rounded-tr-12 !rounded-br-0 !rounded-bl-0
                                        ${senaryHeading}
                                        `}
                  key={i}
                >
                  {heading}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {clients?.map(
            ({
              _id,
              firstName,
              lastName,
              companyName,
              email,
              phone,
              status,
              address,
            }: any) => {
              return (
                <tr key={_id}>
                  <td
                    className={`${senaryHeading} text-slateGray p-5
                        border-0  border-solid border-nebulaGray border-b
                        `}
                  >
                    {firstName}
                    {lastName}
                  </td>
                  <td
                    className={`${senaryHeading} text-slateGray  p-5
                        border-0  border-solid border-nebulaGray border-b
                        `}
                  >
                    {companyName}
                  </td>
                  <td
                    className={`${senaryHeading} text-slateGray  p-5
                        border-0  border-solid border-nebulaGray border-b
                        `}
                  >
                    {email}
                  </td>
                  <td
                    className={`${senaryHeading} text-slateGray  p-5
                        border-0  border-solid border-nebulaGray border-b
                        `}
                  >
                    {phone}
                  </td>
                  <td
                    className={`${senaryHeading} text-slateGray  p-5
                      border-0  border-solid border-nebulaGray border-b
                      `}
                  >
                    {address}
                  </td>
                  <td
                    className={`${senaryHeading} text-slateGray  p-5
                        border-0  border-solid border-nebulaGray border-b
                        `}
                  >
                    <a
                      href="#"
                      className="font-medium
                        text-emeraldGreen hover:underline
                        mix-blend-multiply rounded-2xl bg-mintGreen  p-2
                        "
                    >
                      {status ? 'Active' : 'Blocked'}
                    </a>
                  </td>
                  <td
                    className={`${senaryHeading} text-slateGray  p-5 cursor-pointer relative
                      border-0  border-solid border-nebulaGray border-b
                    `}
                  >
                    <Image
                      src="/moreOptions.svg"
                      alt="action"
                      width={20}
                      height={20}
                      // onClick={() => toggleMenu(_id)}
                    />
                    {/* {openMenuIndex === _id && <Menu clientID={_id} />} */}
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

export default Index;
