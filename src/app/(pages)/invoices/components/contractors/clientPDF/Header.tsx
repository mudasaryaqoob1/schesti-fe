import { Text, View } from '@react-pdf/renderer';

export const PDF_NAVBAR_BG = 'bg-[#6f42c1]';
export const BG_COLOR = '#6f42c1';

export function PdfHeader() {
  return (
    <View style={{
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      width: '100%',
      backgroundColor: BG_COLOR,
      height: '30px',
      paddingLeft: 30,
    }} fixed>
      <Text style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
      }}>Schesti</Text>
    </View>
  );
}
