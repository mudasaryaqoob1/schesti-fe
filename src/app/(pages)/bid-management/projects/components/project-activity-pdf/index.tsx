import { PdfHeader } from "@/app/(pages)/financial/components/contractors/clientPDF/Header";
import { IBidActivity } from "@/app/interfaces/bid-management/bid-management.interface";
import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import moment from "moment";
import { CALL_ICON, GREEN_TRACKING_ICON, MAIL_ICON, NAVIGATION_ICON } from "./icons";


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        marginTop: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#EAECF0',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    activityInfo: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10,
    },
    companyName: {
        fontWeight: 'bold',
        color: '#344054',
        fontSize: 14,
        lineHeight: 1.25,
    },
    secondaryInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    secondaryText: {
        color: '#667085',
        fontSize: 14,
        lineHeight: 1.25,
        marginLeft: 5,
    },
    date: {
        color: '#667085',
        fontSize: 14,
        lineHeight: 1.25,
        fontWeight: 'normal',
    },
});

type Props = {
    activities: IBidActivity[];
}


function ProjectActivityAndStatusPDF({ activities }: Props) {

    return <Document>
        <Page size={'A4'}>
            <PdfHeader brandingColor="#6F6AF8" />
            <Text
                style={{
                    fontSize: 20,
                    color: "#344054",
                    fontWeight: "semibold",
                    marginTop: 8
                }}
            >
                Activity and Status Tracking
            </Text>

            {activities.length > 0 && activities.map((activity) => {
                const activityUser = activity.user;
                return <View key={activity._id} style={styles.container}>
                    <Image src={GREEN_TRACKING_ICON} style={{ height: 23, width: 23 }} />
                    <View style={styles.activityInfo}>
                        <Text style={styles.companyName}>
                            {typeof activityUser !== 'string' ? activityUser.companyName : ""}
                        </Text>
                        <View style={styles.secondaryInfo}>
                            <Image src={NAVIGATION_ICON} style={{ height: 20, width: 20, marginHorizontal: 3 }} />
                            <Text style={styles.secondaryText}>
                                {typeof activityUser !== 'string' ? activityUser.address : ""}
                            </Text>
                            <Image src={MAIL_ICON} style={{ height: 20, width: 20, marginHorizontal: 3 }} />
                            <Text style={styles.secondaryText}>
                                {typeof activityUser !== 'string' ? activityUser.email : ""}
                            </Text>
                            <Image src={CALL_ICON} style={{ height: 20, width: 20, marginHorizontal: 3 }} />
                            <Text style={styles.secondaryText}>
                                {typeof activityUser !== 'string' ? String(activityUser.phone) : ""}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.date}>
                        {moment(activity.createdAt).format('DD MMMM, h:mm A')}
                    </Text>
                </View>
            })}

            {/* <View style={{
                marginTop: 8
            }}>
                <View style={{
                    width: 14.91,
                    height: 14.91,
                    borderRadius: '50%',
                    backgroundColor: "#36B37E",

                }}></View>

            </View> */}

            <View style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                padding: 7,
                backgroundColor: "#F4EBFF"
            }}>
                <Text style={{ fontSize: 10, textAlign: "center", color: "#475467", fontWeight: "normal" }}>
                    &copy; {new Date().getFullYear()} Schesti. All Rights Reserved.
                </Text>
            </View>
        </Page>
    </Document>
}

export default ProjectActivityAndStatusPDF;