
import PrimaryHeading from "@/app/component/headings/primary";
import QuaternaryHeading from "@/app/component/headings/quaternary";
import { DownOutlined } from "@ant-design/icons";

export function G703Component() {

    return <section>
        <div className="flex justify-between items-center">
            <div>
                <QuaternaryHeading title="AIA Document G703, - 1992" />
                <PrimaryHeading title="Continuation Sheet"
                    className="font-normal"
                />
            </div>
            <div>
                <div
                    className={"flex h-10 w-full items-center justify-between rounded-md border border-input  px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
                >
                    <span>Select Previous Phase</span>
                    <DownOutlined />
                </div>
            </div>
        </div>
    </section>
}