'use client';
// import { quinaryHeading } from '@/globals/tailwindvariables';
// import { twMerge } from 'tailwind-merge';
interface Props {
  className?: string;
  clientID: number;
}
const Menu = ({ className }: Props) => {
  return (
    <p>Menu {className}</p>
    // <div
    //   className={twMerge(`flex flex-col p-4
    // shadow-tertiaryMystery3  rounded-lg bg-snowWhite gap-3
    // border border-nebulaGray
    // ${className}`)}
    // >
    //   <Paragraph
    //     title="Create estimate request"
    //     styledVars={quinaryHeading}
    //     classes="text-graphiteGray active:border hover:underline active:border-blue-600"
    //   />
    //   <Paragraph
    //     title="Create Schedule"
    //     styledVars={quinaryHeading}
    //     classes="text-graphiteGray active:border hover:underline"
    //   />
    //   <Paragraph
    //     title="Create new invoice"
    //     styledVars={quinaryHeading}
    //     classes="text-graphiteGray active:border hover:underline"
    //   />
    //   <Paragraph
    //     title="Edit client details"
    //     styledVars={quinaryHeading}
    //     classes="text-graphiteGray active:border hover:underline
    //     "
    //   />
    //   <p
    //     className={`text-graphiteGray active:border hover:underline
    //     ${quinaryHeading}
    //     `
    //     }
    //   >
    //     Delete
    //   </p>
    // </div>
  );
};

export default Menu;
