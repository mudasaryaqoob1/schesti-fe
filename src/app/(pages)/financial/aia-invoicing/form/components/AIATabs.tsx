import { ConfigProvider, Segmented } from "antd";

export function AIATabs() {
    return <ConfigProvider
        theme={{
            components: {
                Segmented: {
                    itemSelectedBg: "#007AB6",
                    itemSelectedColor: "#fff",
                    padding: 10
                },
            },
        }}
    >
        <Segmented
            options={[
                { label: "Current Invoices", value: "current" },
                { label: "History", value: "history" }
            ]}
            size="large"
        />
    </ConfigProvider>
}