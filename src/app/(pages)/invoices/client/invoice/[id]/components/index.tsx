import QuaternaryHeading from "@/app/component/headings/quaternary";
import TertiaryHeading from "@/app/component/headings/tertiary";
import { IClientInvoice } from "@/app/interfaces/client-invoice.interface";
import { clientInvoiceService } from "@/app/services/client-invoices.service";
import { ConfigProvider, Tabs } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { G703Component } from "./G703";

type Props = {
    parentInvoice: IClientInvoice;
}
const G703_KEY = 'G703';
const G702_KEY = 'G702';

export function PhaseComponent({ parentInvoice }: Props) {
    // selected phase will be from allPhases and will be the latest last phase
    const [selectedPhase, setSelectedPhase] = useState<IClientInvoice | null>(null);
    const [tab, setTab] = useState(G703_KEY);
    const [allPhases, setAllPhases] = useState<IClientInvoice[]>([]);
    // parent phase, the id will be in the url
    useEffect(() => {
        if (parentInvoice._id) {
            (async function () {
                try {
                    // get all the phases of the invoice 
                    const response = await clientInvoiceService.httpGetInvoicePhases(parentInvoice._id);
                    if (response.data) {
                        // add parent phase as a previous phase
                        const phases = [parentInvoice, ...response.data.invoices]
                        // sort phases by date using moment
                        phases.sort((a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix());
                        setSelectedPhase(phases[phases.length - 1])
                        setAllPhases(phases)
                    }
                } catch (error) {
                    console.log(error);
                }
            })()
        }
    }, [parentInvoice])

    return <section className="mx-16 my-2">
        <div className="p-5 shadow-md rounded-lg border border-silverGray  bg-white">
            <div className="flex space-x-3">
                <TertiaryHeading title="Invoice name:" className="font-medium" />
                <TertiaryHeading title={`${parentInvoice.invoiceName}`} />
            </div>
        </div>

        <div className="px-4 py-2 my-5 shadow-md rounded-lg border border-silverGray  bg-white">
            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            inkBarColor: '#8449EB',
                        },
                        Input: {
                            padding: 0,
                            borderRadius: 0,
                            colorBorder: 'transparent',
                            controlHeight: 32,
                            colorTextDisabled: 'black',
                        },
                        InputNumber: {
                            borderRadius: 0,
                            colorBorder: 'transparent',
                            controlHeight: 32,
                        },
                        Table: {
                            cellPaddingBlock: 0,
                            cellPaddingInline: 0,
                        },
                    },
                }}
            >
                <Tabs
                    destroyInactiveTabPane
                    onChange={(key) => {
                        setTab(key);
                    }}
                    activeKey={tab}
                    items={[G703_KEY, G702_KEY].map((type) => {
                        return {
                            key: type,
                            label: (
                                <QuaternaryHeading
                                    title={type}
                                    className={`${tab === type ? 'text-RoyalPurple' : 'text-black'}`}
                                />
                            ),
                            tabKey: type,
                            children: tab === G703_KEY ? <G703Component
                                selectedPhase={selectedPhase}
                                setSelectedPhase={setSelectedPhase}
                                phases={allPhases}
                                handleState={() => { }}
                                onCancel={() => { }}
                                onNext={() => { }}
                                state={parentInvoice}
                                sumColumns={() => 9}
                                updateCellValue={() => { }}
                            /> : tab
                        };
                    })}
                />
            </ConfigProvider>
        </div>
    </section>
}