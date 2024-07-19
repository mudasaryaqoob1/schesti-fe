import Image from "next/image";
import { PdfContractMode, ToolState } from "../../types";

type Props = {
    item: ToolState;
    mode: PdfContractMode;
}
export function StandardToolItem({ item, mode }: Props) {

    return <Item
        item={item}
        mode={mode}
    />
}

type ItemProps = {
    item: ToolState;
    mode: PdfContractMode;
}
function Item({ item, mode }: ItemProps) {

    return <div onClick={() => {
        if (mode == 'edit-fields') {
            return;
        }
        console.log("Item Clicked");
    }} className="p-3 rounded-lg border-schestiPrimary border-2 relative font-semibold text-schestiPrimary flex items-center space-x-2 border-dashed bg-schestiLightPrimary">
        <Image src={`/${item.tool}.svg`} width={16} height={16} alt={`${item.tool}`} />
        <p className="capitalize">{item.tool}</p>

        {mode === 'edit-fields' && <Image onClick={(e) => {
            e.stopPropagation();
            console.log("Close clicked");
        }} src={'/close.svg'} className="cursor-pointer p-0.5 absolute -top-2 bg-schestiPrimary rounded-full -right-1" width={16} height={16} alt="delete" />}
    </div>
}