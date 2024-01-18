
import PrimaryHeading from "@/app/component/headings/primary";
import QuaternaryHeading from "@/app/component/headings/quaternary";
import QuinaryHeading from "@/app/component/headings/quinary";
import SenaryHeading from "@/app/component/headings/senaryHeading";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, type MenuProps } from "antd";

export function G703Component() {

    const items: MenuProps['items'] = [
        {
            key: "phase1",
            label: <SenaryHeading title="Phase 1" />
        },
        {
            key: "phase2",
            label: <SenaryHeading title="Phase 2" />
        },

        {
            key: "phase3",
            label: <SenaryHeading title="Phase 3" />
        },

    ];

    return <section>
        <div className="flex justify-between items-center">
            <div>
                <QuaternaryHeading title="AIA Document G703, - 1992" />
                <PrimaryHeading title="Continuation Sheet"
                    className="font-normal"
                />
            </div>
            <div>
                <Dropdown
                    menu={{ items }}
                    placement="bottom"
                >
                    <div
                        className={"flex cursor-pointer h-10 w-full items-center justify-between rounded-md border border-input space-x-5 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
                    >
                        <QuinaryHeading
                            title="Select Previous Phase"
                            className="text-gray-400"
                        />
                        <DownOutlined className="text-gray-400" />
                    </div>
                </Dropdown>
            </div>
        </div>
    </section>
}