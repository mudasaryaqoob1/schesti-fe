import { Popups } from "@/app/(pages)/bid-management/components/Popups";
import CustomButton from "@/app/component/customButton/button";
import WhiteButton from "@/app/component/customButton/white";
import { InputComponent } from "@/app/component/customInput/Input";
import ModalComponent from "@/app/component/modal";
import { IDailyWorkStatus } from "@/app/interfaces/crm/crm-daily-work.interface";
import { useState } from "react";

type Props = {
    statuses: IDailyWorkStatus[];

}
export function ManageStatus({ statuses }: Props) {
    const [showModal, setShowModal] = useState(false);

    return <>
        <ModalComponent
            open={showModal}
            setOpen={setShowModal}
            width="600px"
        >
            <Popups title="Manage Status" onClose={() => setShowModal(false)}>
                <div className="space-y-3">
                    <InputComponent
                        label="Status"
                        name="status"
                        type="text"
                        placeholder="Enter Status"
                    />
                    <div className="max-h-[300px] overflow-y-auto">
                        {statuses.length === 0 ? <p className="text-center font-semibold text-base">No Status</p> : statuses.map((status, index) => {

                            return <div
                                key={index}
                                className="flex items-center justify-between border-b border-[#E5E7EB] py-3">

                                <p>{status.color}</p>
                            </div>
                        })}
                    </div>
                    <div className="flex justify-end ">
                        <CustomButton
                            text="Save"
                            className="!w-fit"
                        />
                    </div>
                </div>
            </Popups>
        </ModalComponent>
        <WhiteButton
            text="Manage Status"
            className="!w-fit !py-2.5"
            onClick={() => setShowModal(!showModal)}
        />
    </>
}