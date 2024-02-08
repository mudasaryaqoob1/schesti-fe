import QuaternaryHeading from "@/app/component/headings/quaternary";
import TertiaryHeading from "@/app/component/headings/tertiary";
import { G7State, IClientInvoice } from "@/app/interfaces/client-invoice.interface";
import { clientInvoiceService } from "@/app/services/client-invoices.service";
import { ConfigProvider, Tabs } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { G703Component } from "./G703";
import { generateData } from "../utils";
import { G702Component } from "./G702";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Props = {
    parentInvoice: IClientInvoice;
}
const G703_KEY = 'G703';
const G702_KEY = 'G702';

export function PhaseComponent({ parentInvoice }: Props) {
    const router = useRouter();
    // selected phase will be from allPhases and will be the latest last phase
    const [selectedPhase, setSelectedPhase] = useState<IClientInvoice | null>(null);
    const [tab, setTab] = useState(G703_KEY);
    // all phases of the parent invoice
    const [allPhases, setAllPhases] = useState<IClientInvoice[]>([]);
    const [g7State, setG7State] = useState<G7State>({
        applicationNo: '',
        invoiceName: '',
        applicationDate: new Date().toString(),
        periodTo: new Date().toString(),
        projectNo: '',
        data: generateData(),
        address: '',
        amountCertified1: '',
        amountCertified2: '',
        by: '',
        country: '',
        date: new Date().toString(),
        distributionTo: 'Architect',
        myCommissionExpires: '',
        notaryPublic: '',
        project: '',
        stateOf: '',
        subscribedAndSworn: '',
        phase: 0,
        toOwner: '',
        viaEngineer: '',

        amountCertified3: '',
        totalAdditionPreviousMonth: 0,
        totalAdditionThisMonth: 0,
        totalDeductionPreviousMonth: 0,
        totalDeductionThisMonth: 0,

        p5aPercentage: 10,
        p5bPercentage: 2,
    });

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
                        const _selectedPhase = phases[phases.length - 1];
                        setAllPhases(phases)
                        setSelectedPhase(_selectedPhase);
                        setG7State(_selectedPhase);
                        updatePreviousApplicationColumn(_selectedPhase);
                    }
                } catch (error) {
                    console.log(error);
                }
            })()
        }
    }, [parentInvoice])
    function handleG7State<K extends keyof G7State>(
        key: K,
        value: (typeof g7State)[K]
    ) {
        setG7State(prev => ({ ...prev, [key]: value }));
    }
    function updatePreviousApplicationColumn(_selectedPhase: IClientInvoice) {
        let previousPhaseData = JSON.parse(JSON.stringify(_selectedPhase.data)) as Array<string[]>;
        const data = [...previousPhaseData];
        const COLUMN_THIS_PERIOD = 4;
        const COLUMN_PREVIOUS_APPLICATION = 3;

        // loop over data
        data.forEach((row) => {
            const previousPhaseThisPeriodValue = Number(row[COLUMN_THIS_PERIOD]);
            const previousPhasePreviousApplicationValue = Number(row[COLUMN_PREVIOUS_APPLICATION]);
            const value = previousPhaseThisPeriodValue + previousPhasePreviousApplicationValue;
            row[COLUMN_PREVIOUS_APPLICATION] = value.toString();
            row[COLUMN_THIS_PERIOD] = '';
        })
        handleG7State('data', data);
    }
    function sumColumns(rows: Array<string[]>, column: number): number {
        let sum = 0;
        rows.forEach((row) => {
            let val = Number(row[column]);
            sum += isNaN(val) ? 0 : val;
        });
        return isNaN(sum) ? 0 : sum;
    }


    function updateCellValue(
        row: number,
        column: number,
        value: number | string
    ) {
        let newData = [...g7State.data];
        newData[row][column] = `${value}`;
        newData = updateColumn6(newData, row);
        newData = updateColumn7(newData, row);
        newData = updateColumn8(newData, row);
        newData = updateColumn9(newData, row);
        handleG7State('data', newData);
    }

    function updateColumn6(data: Array<string[]>, rowIndex: number) {
        const newData = [...data];
        const row = newData[rowIndex];
        let columnD = row[3];
        let columnE = row[4];
        let columnF = row[5];
        let sum = Number(columnD) + Number(columnE) + Number(columnF);
        newData[rowIndex][6] = `${sum}`;
        return newData;
    }

    function updateColumn7(data: Array<string[]>, rowIndex: number) {
        const newData = [...data];
        const row = newData[rowIndex];
        let columnC = Number(row[2]);
        let columnG = Number(row[6]);
        // % (G ÷ C)
        let result = (columnG / columnC) * 100;
        newData[rowIndex][7] = `${isNaN(result) ? 0 : result}`;
        return newData;
    }

    function updateColumn8(data: Array<string[]>, rowIndex: number) {
        const newData = [...data];
        const row = newData[rowIndex];
        let columnG = Number(row[6]);
        let columnC = Number(row[2]);
        let result = columnC - columnG;
        newData[rowIndex][8] = `${isNaN(result) ? 0 : result}`;
        return newData;
    }

    function updateColumn9(data: Array<string[]>, rowIndex: number) {
        const newData = [...data];
        const row = newData[rowIndex];
        let columnF = row[5];
        // 10% of F
        let result = (g7State.p5aPercentage / 100) * Number(columnF);
        newData[rowIndex][9] = `${isNaN(result) ? 0 : Math.ceil(result)}`;
        return newData;
    }

    function handleSubmit(data: G7State) {
        clientInvoiceService
            .httpCreateNewInvoicePhase(parentInvoice._id, data)
            .then((response) => {
                if (response.statusCode == 201) {
                    router.push('/invoices');
                }
            })
            .catch(({ response }: any) => {
                toast.error(response?.data.message);
            });
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
                                selectedPhase={selectedPhase}
                                setSelectedPhase={value => {
                                    const _selectedPhase = allPhases.find(phase => phase._id === value);
                                    if (_selectedPhase) {
                                        setSelectedPhase(_selectedPhase);
                                        setG7State(_selectedPhase);
                                        updatePreviousApplicationColumn(_selectedPhase);
                                    }
                                }}
                                phases={allPhases}
                                handleState={handleG7State}
                                onCancel={() => { }}
                                onNext={() => {
                                    setTab(G702_KEY);
                                }}
                                state={g7State}
                                sumColumns={sumColumns}
                                updateCellValue={updateCellValue}
                            /> :
                                <G702Component
                                    handleState={handleG7State}
                                    onCancel={() => {
                                        setTab(G703_KEY);
                                    }}
                                    onNext={() => {
                                        handleSubmit(g7State);
                                    }}
                                    state={g7State}
                                    previousPhaseState={selectedPhase}
                                    sumColumns={sumColumns}
                                />
                        };
                    })}
                />
            </ConfigProvider>
        </div>
    </section>
}