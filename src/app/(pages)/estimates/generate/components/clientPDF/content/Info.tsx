import { StyleSheet, View } from '@react-pdf/renderer';
import { PdfHeading, PdfText } from './Heading';
const styles = StyleSheet.create({
  gridItem: {
    width: '30%', // Adjust the width based on your layout
    marginBottom: 16,
  },
  infoContainer: {
    margin: '0.75rem',
  },
});

export function InfoContainer({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <View style={[styles.infoContainer, styles.gridItem]}>
      <PdfHeading text={title} />
      <PdfText text={description} />
    </View>
  );
}