import { StyleSheet, View } from '@react-pdf/renderer';
import { InfoContainer } from './Info';
import { PdfTable } from './Table';
import { PdfApproval } from './Approval';

const styles = StyleSheet.create({
  content: {
    margin: 10,
    paddingTop: 10,
  },
});

const infoStyles = StyleSheet.create({
  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
export function PageContent({ data, subcostRecord, pdfData }: any) {
  return (
    <View style={styles.content}>
      {/* INFO */}

      <View style={{ marginTop: 8 }}>
        <View style={infoStyles.gridContainer}>
          <InfoContainer
            title="Client Name"
            description={data?.takeOffDetail?.clientName}
          />
          <InfoContainer
            title="Company Name"
            description={data?.takeOffDetail?.companyName}
          />
          <InfoContainer
            title="Phone Number"
            description={data?.takeOffDetail?.phone}
          />
          <InfoContainer
            title="Email"
            description={data?.takeOffDetail?.email}
          />
          <InfoContainer
            title="Project Name"
            description={data?.takeOffDetail?.projectName}
          />
          <InfoContainer
            title="Lead Source"
            description={data?.takeOffDetail?.leadSource}
          />
          <InfoContainer
            title="Project Value"
            description={data?.takeOffDetail?.projectValue}
          />
        </View>
      </View>

      {/* Table */}
      <PdfTable items={pdfData} totalAmount={subcostRecord} />
      {/* END Table */}

      {/*  Approval */}
      <PdfApproval />
      {/* END Approval */}
    </View>
  );
}
