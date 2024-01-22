'use client';
import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ConfigProvider, Tabs } from "antd";
import { useSearchParams } from "next/navigation";


import { HttpService } from "@/app/services/base.service";
import { selectToken } from "@/redux/authSlices/auth.selector";
import TertiaryHeading from "@/app/component/headings/tertiary";
import QuaternaryHeading from "@/app/component/headings/quaternary";
import { G703Component } from "./components/G703";
import { G702Component } from "./components/G702";
import { type G703Row, rowTemplate } from "./utils";


const G703_KEY = "G703";
const G702_KEY = "G702";
type G703State = {
  applicationNo: string,
  applicationDate: string,
  periodTo: string,
  projectNo: string;
  data: Array<G703Row>;
}

export default function CreateClientInvoicePage() {
  const token = useSelector(selectToken);
  const searchParams = useSearchParams()
  const invoiceName = searchParams.get("invoiceName");
  const [tab, setTab] = useState(G703_KEY);
  const [g703State, setG703State] = useState<G703State>({
    applicationNo: "",
    applicationDate: "",
    periodTo: "",
    projectNo: "",
    data: [
      rowTemplate(1)
    ],
  });

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  function addRow() {
    // add rowTempate in data
    setG703State({ ...g703State, data: [...g703State.data, rowTemplate(g703State.data.length + 1)] })
  }

  // getCalculatedRows
  function getCalculatedRows(): G703Row {
    const data = g703State.data
    return ["GRAND TOTAL", `=SUM(B1:B${data.length})`, `=SUM(C1:C${data.length})`, `=SUM(D1:D${data.length})`, `=SUM(E1:E${data.length})`, `=SUM(F1:F${data.length})`, `=SUM(G1:G${data.length})`, `=SUM(H1:H${data.length})`, `=SUM(I1:I${data.length})`]
  }

  return (
    <section className="mx-16 my-2">
      <div className="p-5 shadow-md rounded-lg border border-silverGray  bg-white">
        <div className="flex space-x-3">
          <TertiaryHeading title="Involve name:"
            className="font-medium"
          />
          <TertiaryHeading title={`${invoiceName}`} />
        </div>
      </div>


      <div className="px-4 py-2 my-5 shadow-md rounded-lg border border-silverGray  bg-white">
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                inkBarColor: '#8449EB',
              },
            },
          }}
        >
          <Tabs
            defaultActiveKey={G703_KEY}
            destroyInactiveTabPane
            onChange={(type) => {
              setTab(type);
            }}
            items={[G703_KEY, G702_KEY].map((type) => {
              return {
                key: type,
                label: (
                  <QuaternaryHeading
                    title={type}
                    className="text-RoyalPurple"
                  />
                ),
                tabKey: type,
                children:
                  tab === G703_KEY ? <G703Component
                    addRow={addRow}
                    getCalculatedRows={getCalculatedRows}
                    data={g703State.data}
                  /> : <G702Component />
              };
            })}
          />
        </ConfigProvider>
      </div>
    </section>
  )
}