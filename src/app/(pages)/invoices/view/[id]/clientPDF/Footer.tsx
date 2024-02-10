import { StyleSheet, View } from '@react-pdf/renderer';

export const PDF_NAVBAR_BG = 'bg-[#6f42c1]';
export const BG_COLOR = '#6f42c1';

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type Props = {
  brandingColor?: string;
}

export function PdfFooter({ brandingColor }: Props) {
  return <View style={[styles.footer, { backgroundColor: brandingColor ? brandingColor : BG_COLOR }]} fixed></View>;
}
