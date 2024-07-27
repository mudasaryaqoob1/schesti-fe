import { dailyWorkColors } from "../utils";

export function ChooseColor() {
    return <div className="grid grid-cols-4 gap-3 bg-white h-full py-3 px-2">
        {dailyWorkColors.map((color) => {
            return <div key={color} style={{
                background: color
            }} className="w-[25px] h-[25px]">

            </div>
        })}
    </div>
}