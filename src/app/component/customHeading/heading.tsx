import { twMerge } from 'tailwind-merge';

interface Props {
  styledVars: string;
  classes?: string;
  title: string;
}
const Heading = ({ styledVars, title, classes }: Props) => {
  return <h6 className={twMerge(`${styledVars} ${classes}`)}>{title}</h6>;
};

export default Heading;
