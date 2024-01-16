import { StyleSheet, View } from '@react-pdf/renderer';
import { InfoContainer } from './Info';
import { PdfData } from '../type';
import { PdfScopeOfWork } from './ScopeOfWork';
import { PdfTable } from './Table';
import { PdfApproval } from './Approval';

type Props = {
  data: PdfData;
};

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
export function PageContent({ data }: Props) {
  return (
    <View style={styles.content}>
      {/* INFO */}

      <View style={{ marginTop: 8 }}>
        <View style={infoStyles.gridContainer}>
          <InfoContainer title="Proposal ID" description={data.proposalID} />
          <InfoContainer title="Recipient" description={data.recipient} />
          <InfoContainer title="Job Site" description={data.jobSite} />
          <InfoContainer
            title="Property Name"
            description={data.propertyName}
          />
          <InfoContainer title="Company Name" description={data.companyName} />
          <InfoContainer title="Project name" description={data.projectName} />
        </View>
      </View>

      {/* END INFO */}
      {/* SCOPE */}
      <PdfScopeOfWork scope={data.scope} />
      {/* END SCOPE */}

      {/* Table */}
      <PdfTable items={data.items} totalAmount={data.totalAmount} />
      {/* END Table */}

      {/*  Approval */}
      <PdfApproval />
      {/* END Approval */}
    </View>
  );
}
