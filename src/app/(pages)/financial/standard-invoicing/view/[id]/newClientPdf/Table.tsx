import { IInvoice } from "@/app/interfaces/invoices.interface";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const PurpleColor = '#7138DF';
const LightBalck = '#475467';
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    itemsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottom: `1px solid #EAECF0`,
        paddingBottom: 7
    },
    divider: {
        borderBottom: `1px solid #EAECF0`,
        paddingVertical: 7,
    },
    heading: { color: PurpleColor, fontSize: 12, marginBottom: 5, flex: 1 },
    text: { color: LightBalck, fontSize: 12, letterSpacing: 0.9, marginTop: 1 },
    totalContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginTop: 50,
    },
    subtotalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 150
    }
})

type Props = {
    invoice: IInvoice;
}
export function ItemsTable({ invoice }: Props) {

    const subtotal = invoice.invoiceItems.reduce((acc, item) => acc + item.total, 0);

    return <View style={{ paddingHorizontal: 30 }}>
        <View style={styles.container}>
            <Text style={styles.heading}>Description</Text>
            <Text style={styles.heading}>Rate</Text>
            <Text style={styles.heading}>Qty</Text>
            <Text style={styles.heading}>Line Total</Text>
        </View>

        {invoice.invoiceItems.map((item) => <View key={item._id} style={styles.itemsContainer}>
            <Text style={[styles.text, { flex: 1 }]}>{item.description}</Text>
            <Text style={[styles.text, { flex: 1 }]}>${item.unitCost}</Text>
            <Text style={[styles.text, { flex: 1 }]}>{item.quantity}</Text>
            <Text style={[styles.text, { flex: 1 }]}>${item.total.toFixed(2)}</Text>
        </View>)}

        <View style={styles.totalContainer}>
            <View style={styles.subtotalContainer}>
                <Text style={styles.text}>Subtotal</Text>
                <Text style={styles.text}>${subtotal.toFixed(2)}</Text>
            </View>

            <View style={[styles.subtotalContainer, { marginTop: 5 }]}>
                <Text style={styles.text}>Discount</Text>
                <Text style={styles.text}>${invoice.discount}</Text>
            </View>

            <View style={[styles.subtotalContainer, { marginTop: 5 }]}>
                <Text style={styles.text}>Taxes</Text>
                <Text style={styles.text}>${invoice.taxes}</Text>
            </View>

            <View style={[styles.subtotalContainer, styles.divider, { marginTop: 5 }]}>
                <Text style={styles.text}>Profit And Overhead</Text>
                <Text style={styles.text}>{invoice.profitAndOverhead}%</Text>
            </View>

            {/* Amount Due (USD) */}
            {invoice.status === 'paid' ? <View style={[styles.subtotalContainer, { marginTop: 5, width: 170 }]}>
                <Text style={styles.heading}>Amount Due (USD)</Text>
                <Text style={styles.text}>${invoice.totalPayable}</Text>
            </View> : <View style={[styles.subtotalContainer, { marginTop: 5, width: 170 }]}>
                <Text style={styles.heading}>Amount Paid (USD)</Text>
                <Text style={styles.text}>${invoice.totalPayable}</Text>
            </View>}
        </View>
    </View>
}