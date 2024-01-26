import { InputComponent } from "@/app/component/customInput/Input";
import TertiaryHeading from "@/app/component/headings/tertiary";
import { CloseOutlined } from "@ant-design/icons";

type Props = {
    onClose: () => void;
};

export function SetWorkWeek({ onClose }: Props) {

    return <div className="px-4 py-2 bg-white border border-solid border-elboneyGray rounded-[4px] z-50">
        <div className="flex  py-2.5 justify-between">
            <TertiaryHeading
                title="Set Workweek"
                className="text-graphiteGray"
            />
            <CloseOutlined
                className="cursor-pointer"
                width={24}
                height={24}
                onClick={onClose}
            />
        </div>

        <div>
            <InputComponent
                label="Hours Per Day"
                name="hours"
                type="number"
                placeholder="Set number of hours per day"
                labelStyle="text-[#344054] font-normal"
                label2="Zero regular hours will result in a zero hourly rate for unpaid leave deductions."
            />
        </div>
    </div>
}