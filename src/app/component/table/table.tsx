import { senaryHeading } from '@/globals/tailwindvariables';
import { clientsData } from '@/app/constants/constant';
// import Menu from './menu';
interface Props {
  headings: string[];
}
const Index = ({ headings }: Props) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
      <table className="w-full text-sm text-left rtl:text-right">
        <thead className="text-xs bg-cosmicGray ">
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
          {clientsData?.map(
            ({
              id,
              firstName,
              lastName,
              companyName,
              email,
              phoneNumber,
              status,
              address,
            }) => {
              return (
                <tr key={id}>
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
                    {phoneNumber}
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
                      {status}
                    </a>
                  </td>
                  {/* <td
                    className={`${senaryHeading} text-slateGray  p-5 cursor-pointer relative
                      border-0  border-solid border-nebulaGray border-b
                    `}
                  >
                    <Image
                      src="/moreOptions.svg"
                      alt="action"
                      width={20}
                      height={20}
                      onClick={() => toggleMenu(i)}
                    />
                    {openMenuIndex === i && (
                      <Menu
                        clientID={id}
                      />
                    )}
                  </td> */}
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
