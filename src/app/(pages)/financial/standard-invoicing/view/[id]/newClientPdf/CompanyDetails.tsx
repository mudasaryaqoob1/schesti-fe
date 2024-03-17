/* eslint-disable jsx-a11y/alt-text */
import { IInvoice } from "@/app/interfaces/invoices.interface";
import { Image, Text, View } from "@react-pdf/renderer";
import { IUpdateCompanyDetail } from "@/app/interfaces/companyInterfaces/updateCompany.interface";
import moment from "moment";

type Props = {
    user: IUpdateCompanyDetail;
    invoice: IInvoice;
}

const PurpleColor = "#7138DF";
const LightBalck = "#475467";
const DarkColor = '#181818'
export function PdfCompanyDetails({ invoice, user }: Props) {
    return <View style={[
        { marginTop: 128, paddingHorizontal: 48 }
    ]}>
        <View
            style={[
                {
                    flexDirection: "column",
                    alignItems: "flex-end",
                },
            ]}
        >
            {user.avatar ? <Image src={user.avatar}
                style={[
                    { width: 320, height: 190 }
                ]}
            /> : <Text>
                Schesti</Text>}
            <View
                style={[
                    { paddingRight: 16, paddingTop: 48 }
                ]}>
                <Text
                    style={{ color: LightBalck, fontSize: 12, lineHeight: 20 }}
                >
                    {user.name}
                </Text>
                <Text
                    style={{ color: LightBalck, fontSize: 12, lineHeight: 20 }}>
                    {user.email}</Text>
                <Text
                    style={{ color: LightBalck, fontSize: 12, lineHeight: 20 }}>
                    {user.phone ? user.phone : ""}
                </Text>
            </View>
        </View>

        <View
            style={[
                { flexDirection: "row", justifyContent: "space-between", marginTop: 256 }
            ]}
        >
            <View
                style={[
                    {
                        flexDirection: "column"
                    }
                ]}
            >
                <Text
                    style={[
                        { color: PurpleColor, fontSize: 12, lineHeight: 20 }
                    ]}
                >
                    Billed To Client/Contractor
                </Text>
                <Text
                    style={[{ color: LightBalck, fontSize: 12, lineHeight: 20 }]}
                >
                    {`${invoice.subContractorFirstName} ${invoice.subContractorLastName}`}
                </Text>
                <Text
                    style={[{ color: LightBalck, fontSize: 12, lineHeight: 20 }]}
                >
                    {invoice.subContractorCompanyName}
                </Text>
                <Text
                    style={[{ color: LightBalck, fontSize: 12, lineHeight: 20 }]}
                >
                    {invoice.subContractorAddress}
                </Text>
            </View>

            <View style={[
                {
                    flexDirection: "column"
                }
            ]}>
                <View>
                    <Text
                        style={[{ color: PurpleColor, fontSize: 12, lineHeight: 20 }]}
                    >
                        Date of Issue
                    </Text>
                    <Text
                        style={[{ color: LightBalck, fontSize: 12, lineHeight: 20 }]}
                    >
                        {moment(invoice.issueDate).format("YYYY-MM-DD")}
                    </Text>
                </View>

                <View style={[
                    { marginTop: 48 }
                ]}>
                    <Text
                        style={[{ color: PurpleColor, fontSize: 12, lineHeight: 20 }]}
                    >
                        Due Date
                    </Text>
                    <Text
                        style={[{ color: LightBalck, fontSize: 12, lineHeight: 20 }]}
                    >
                        {moment(invoice.dueDate).format("YYYY-MM-DD")}
                    </Text>
                </View>
            </View>


            <View style={[
                {
                    flexDirection: "column"
                }
            ]}>
                <View>
                    <Text
                        style={[{ color: PurpleColor, fontSize: 12, lineHeight: 20 }]}
                    >
                        Invoice Number
                    </Text>
                    <Text
                        style={[{ color: LightBalck, fontSize: 12, lineHeight: 20 }]}
                    >
                        {invoice.invoiceNumber}
                    </Text>
                </View>

                <View style={[
                    { marginTop: 48 }
                ]}>
                    <Text
                        style={[{ color: PurpleColor, fontSize: 12, lineHeight: 20 }]}
                    >
                        Project Name
                    </Text>
                    <Text
                        style={[{ color: LightBalck, fontSize: 12, lineHeight: 20 }]}
                    >
                        {invoice.projectName}
                    </Text>
                </View>
            </View>


            <View style={[
                {
                    flexDirection: "column"
                }
            ]}>
                <View>
                    <Text
                        style={[{ color: PurpleColor, fontSize: 12, lineHeight: 20 }]}
                    >
                        Amount Due (USD)
                    </Text>
                    <Text
                        style={[{ color: DarkColor, fontSize: 30, lineHeight: 44 }]}
                    >
                        {`$${invoice.totalPayable}`}
                    </Text>
                </View>


            </View>
        </View>
    </View>
}