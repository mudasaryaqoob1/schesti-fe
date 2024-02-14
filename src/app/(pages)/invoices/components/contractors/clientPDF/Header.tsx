import { Image, View } from '@react-pdf/renderer';

export const PDF_NAVBAR_BG = 'bg-[#6f42c1]';
export const BG_COLOR = '#6f42c1';

type Props = {
  logo?: string;
  brandingColor: string;
};
const defaultLogo = "https://schesti-dev.s3.eu-north-1.amazonaws.com/2024/documents/estimates/e50ee8bc83d54461995f51e72a192f51-Group%20226.png";

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
        src={logo ? logo : defaultLogo}
        style={{
          width: 50,
          height: 30,
          paddingVertical: 5,
        }}
      />
    </View>
  );
}
