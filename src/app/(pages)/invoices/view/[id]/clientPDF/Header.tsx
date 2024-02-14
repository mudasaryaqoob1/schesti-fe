import { Image, StyleSheet, View } from '@react-pdf/renderer';

export const PDF_NAVBAR_BG = 'bg-[#6f42c1]';
export const BG_COLOR = '#6f42c1';
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    height: '30px',
    paddingLeft: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

type Props = {
  logo?: string;
  brandingColor?: string;
};
const defaultLogo = process.env.NEXT_PUBLIC_SCHESTI_IMAGE_URL;
export function PdfHeader({ logo, brandingColor }: Props) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: brandingColor ? brandingColor : BG_COLOR },
      ]}
      fixed
    >
      <Image
        src={logo ? logo : defaultLogo}
        style={{
          width: 40,
          height: 40,
        }}
      />
    </View>
  );
}
