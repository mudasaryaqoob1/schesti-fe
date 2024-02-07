'use client';

import { HttpService } from "@/app/services/base.service";
import { selectToken } from "@/redux/authSlices/auth.selector";
import { useParams } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NoInvoiceFound } from "./components/NoInvoiceFound";
import { selectClientInvoices } from "@/redux/client-invoices/client-invoice.selector";
import { ConfigProvider, Tabs } from "antd";
import TertiaryHeading from "@/app/component/headings/tertiary";
import QuaternaryHeading from "@/app/component/headings/quaternary";

const G703_KEY = 'G703';
const G702_KEY = 'G702';
export default function CreateClientInvoicePage() {
    const token = useSelector(selectToken);
    const params = useParams<{ id: string }>();
    const allInvoices = useSelector(selectClientInvoices);
    const parentInvoice = allInvoices?.find(invoice => invoice._id === params.id);
    const [tab, setTab] = useState(G703_KEY);

    useLayoutEffect(() => {
        if (token) {
            HttpService.setToken(token);
        }
    }, [token]);

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
                            children: tab
                        };
                    })}
                />
            </ConfigProvider>
        </div>
    </section>
}