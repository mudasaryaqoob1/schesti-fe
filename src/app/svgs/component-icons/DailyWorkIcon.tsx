import Icon from '@ant-design/icons';
import type { GetProps } from 'antd';

type IconComponentProps = GetProps<typeof Icon>;

const DailyWorkSVG = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      marginTop: '15px !important',
    }}
  >
    <g xmlns="http://www.w3.org/2000/svg">
      <g>
        <g>
          <path d="M416,248V116.688L299.312,0H0v496h416v-96h80V248H416z M304,27.312L388.688,112H304V27.312z M400,480H16V16h272v112h112     v120h-16v16h-5.336l-28.352-21.264L328,198.112V144h-45.416L264,190.464V216l5.752,24h-84.304l-9.64,48.192l10.528,42.12     L160,352.6V336H32v128h128v-90.448l30.664-25.944l1.584,6.328L211.056,392h152.256l8-8H384v16h16V480z M280,215.016v-21.48     L293.416,160H312v41.888l25.688,51.376L373.336,280H384v88h-19.312l-8,8H220.944l-13.4-26.792L192.192,287.8l6.36-31.8h91.696     L280,215.016z M75.72,432h15.208L144,387.096V448H48v-96h96v14.136L85.072,416H84.28l-13.624-20.44l-13.312,8.872L75.72,432z      M480,384h-80V264h80V384z" />
          <path d="M160,69.552l37.168-31.448L186.84,25.888L160,48.6V32H32v128h128V69.552z M144,62.136L85.072,112H84.28L70.656,91.56     l-13.312,8.872L75.72,128h15.208L144,83.096V144H48V48h96V62.136z" />
          <path d="M160,221.552l37.168-31.448l-10.328-12.216L160,200.6V184H32v128h128V221.552z M144,214.136L85.072,264H84.28     l-13.624-20.44l-13.312,8.872L75.72,280h15.208L144,235.096V296H48v-96h96V214.136z" />
        </g>
      </g>
    </g>
  </svg>
);

export const DailyWorkIcon = (props: IconComponentProps) => {
  return <Icon component={DailyWorkSVG} {...props} />;
};
