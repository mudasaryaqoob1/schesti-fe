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
export function PageContent({ estimateDetail, subcostRecord, pdfData }: any) {
  return (
    <View style={styles.content}>
      {/* INFO */}

      <View style={{ marginTop: 8 }}>
        <View style={infoStyles.gridContainer}>
          <InfoContainer
            title="Client Name"
            description={estimateDetail?.estimateRequestIdDetail?.clientName}
          />
          <InfoContainer
            title="Company Name"
            description={estimateDetail?.estimateRequestIdDetail?.companyName}
          />
          <InfoContainer
            title="Phone Number"
            description={estimateDetail?.estimateRequestIdDetail?.phone}
          />
          <InfoContainer
            title="Email"
            description={estimateDetail?.estimateRequestIdDetail?.email}
          />
          <InfoContainer
            title="Project Name"
            description={estimateDetail?.estimateRequestIdDetail?.projectName}
          />
          <InfoContainer
            title="Lead Source"
            description={estimateDetail?.estimateRequestIdDetail?.leadSource}
          />
          <InfoContainer
            title="Project Value"
            description={estimateDetail?.estimateRequestIdDetail?.projectValue}
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