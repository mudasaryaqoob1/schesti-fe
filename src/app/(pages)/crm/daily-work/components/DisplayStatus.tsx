import { IDailyWorkStatus } from "@/app/interfaces/crm/crm-daily-work.interface"
import { hexToRgba } from "@/app/utils/colors.utils";

type Props = {
    item: IDailyWorkStatus;
}
export function DisplayDailyWorkStatus({ item }: Props) {
    return <div style={{
        backgroundColor: hexToRgba(item.color, 0.1),
        color: item.color
    }} className="text-sm leading-5 rounded-md px-3 py-2">
        {item.name}
    </div>
}