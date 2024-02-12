import { Image, View } from '@react-pdf/renderer';

export const PDF_NAVBAR_BG = 'bg-[#6f42c1]';
export const BG_COLOR = '#6f42c1';

type Props = {
  logo?: string;
  brandingColor: string;
};
export function PdfHeader({ brandingColor, logo }: Props) {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: brandingColor ? brandingColor : BG_COLOR,
        height: '30px',
        paddingLeft: 30,
      }}
      fixed
    >
      <Image
        src={logo ? logo : './logo.svg'}
        style={{
          width: 30,
          height: 30,
        }}
      />
    </View>
  );
}
