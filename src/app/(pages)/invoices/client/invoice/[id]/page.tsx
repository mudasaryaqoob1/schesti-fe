'use client';

import { HttpService } from "@/app/services/base.service";
import { selectToken } from "@/redux/authSlices/auth.selector";
import { useParams } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NoInvoiceFound } from "./components/NoInvoiceFound";
import { selectClientInvoices } from "@/redux/client-invoices/client-invoice.selector";
import { ConfigProvider, Tabs } from "antd";
import TertiaryHeading from "@/app/component/headings/tertiary";
import QuaternaryHeading from "@/app/component/headings/quaternary";
import { G703Component } from "./components/G703";
import { IClientInvoice } from "@/app/interfaces/client-invoice.interface";
import { clientInvoiceService } from "@/app/services/client-invoices.service";
import moment from "moment";

const G703_KEY = 'G703';
const G702_KEY = 'G702';
export default function CreateClientInvoicePage() {
    const token = useSelector(selectToken);
    const params = useParams<{ id: string }>();
    const allInvoices = useSelector(selectClientInvoices);
    const [allPhases, setAllPhases] = useState<IClientInvoice[]>([]);
    const parentInvoice = allInvoices?.find(invoice => invoice._id === params.id);
    const [tab, setTab] = useState(G703_KEY);

    useLayoutEffect(() => {
        if (token) {
            HttpService.setToken(token);
        }
    }, [token]);

    useEffect(() => {
        if (params.id) {
            (async function () {
                try {
                    // get all the phases of the invoice 
                    const response = await clientInvoiceService.httpGetInvoicePhases(params.id);
                    if (response.data) {
                        // add parent phase as a previous phase
                        const phases = parentInvoice ? [parentInvoice, ...response.data.invoices] : response.data.invoices;
                        // sort phases by date using moment
                        phases.sort((a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix());
                        setAllPhases(phases)
                    }
                } catch (error) {
                    console.log(error);
                }
            })()
        }
    }, [params.id, parentInvoice])

    if (!parentInvoice) {
        return <NoInvoiceFound />
    }

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
                                phases={allPhases.map(phase => ({ label: `Pay Application - ${moment(phase.createdAt).format('DD/MM/YYYY')}`, value: phase._id }))}
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