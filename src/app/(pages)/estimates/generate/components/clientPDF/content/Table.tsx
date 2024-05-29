import { StyleSheet, View } from '@react-pdf/renderer';
import { PdfHeading, PdfText } from './Heading';
import {USCurrencyFormat} from '@/app/utils/format'

type Props = {
  items: {
    description: string;
    quantity: string;
    // totalPrice: string;
    total: string;
  }[];
  totalAmount: number;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    border: '1px solid #f9f5ff',
    padding: 5,
    borderRadius: 5,
  },
  table: {
    width: '100%',
    borderRadius: 5,
    borderSpacing: 0,
  },
  tableHeader: {
    backgroundColor: '#f9f5ff',
    border: '1px solid #f9f5ff',
  },
  tableRow: {
    borderBottom: '1px solid #f9f5ff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '4px 4px',
  },
  bodyRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '4px 4px',
  },
  headingCell: {
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
  },
  bodyCell: {
    fontWeight: 'bold',
    width: '100%',
    flex: 1,
    textAlign: 'center',
  },
  descriptionCell: {
    fontWeight: 'bold',
    width: '100%',
    flex: 1,
  },
  totalAmountContainer: {
    paddingTop: 3,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 4,
  },
});
export const PdfTable: React.FC<Props> = ({ items, totalAmount }) => {
  return (
    <View style={{ flexDirection: 'column' }}>
      <View style={styles.container}>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>
              <PdfHeading
                text="Item / Description"
                style={styles.headingCell}
              />
              <PdfHeading text="Quantity" style={styles.headingCell} />
              <PdfHeading text="Total Price" style={styles.headingCell} />
            </View>
          </View>
        </View>
        <View style={styles.table}>
          {items?.length &&
            items?.map((item, index) => {
              return (
                <View key={index} style={styles.bodyRow}>
                  <PdfText
                    text={item.description}
                    style={styles.descriptionCell}
                  />
                  <PdfText text={item.quantity} style={styles.bodyCell} />
                  <PdfText text={USCurrencyFormat.format(Number(item.total))} style={styles.bodyCell} />
                </View>
              );
            })}
        </View>
      </View>
      <TotalAmount amount={totalAmount} />
    </View>
  );
};

const TotalAmount = ({ amount }: { amount: number }) => (
  <View style={styles.totalAmountContainer}>
    <PdfHeading text="Total: " />
    <PdfText text={`$${amount}`} style={{ fontSize: 14 }} />
  </View>
);