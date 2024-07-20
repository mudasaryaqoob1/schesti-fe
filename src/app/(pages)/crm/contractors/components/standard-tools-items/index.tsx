import Image from "next/image";
import { PdfContractMode, ToolState } from "../../types";

type Props = {
    item: ToolState;
    mode: PdfContractMode;
    onDelete?: () => void;
    onClick?: () => void;
}
export function StandardToolItem({ item, mode, onDelete, onClick }: Props) {

    if (mode === 'add-values') {
        return <div style={{
            position: 'absolute',
            left: item.position.x,
            top: item.position.y,
            cursor: 'pointer',
            padding: 0,
            margin: 0,
            backgroundColor: "transparent"
        }}>

            <Item
                item={item}
                mode={mode}
                onClick={onClick}
                onDelete={onDelete}
            />
        </div>
    }
    return <Item
        item={item}
        mode={mode}
        onClick={onClick}
        onDelete={onDelete}
    />
}

type ItemProps = {
    item: ToolState;
    mode: PdfContractMode;
    onDelete?: () => void;
    onClick?: () => void;
}
function Item({ item, mode, onClick, onDelete }: ItemProps) {

    return <div onClick={() => {
        if (mode == 'edit-fields') {
            return;
        }

        onClick?.();
    }} className="p-3 rounded-lg border-schestiPrimary border-2 h-fit relative font-semibold text-schestiPrimary flex items-center space-x-2 border-dashed bg-schestiLightPrimary m-0">
        <Image src={`/${item.tool}.svg`} width={16} height={16} alt={`${item.tool}`} />
        <p className="capitalize">{item.tool}</p>

        {mode === 'edit-fields' && <Image onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
        }} src={'/close.svg'} className="cursor-pointer p-0.5 absolute -top-2 bg-schestiPrimary rounded-full -right-1" width={16} height={16} alt="delete" />}
    </div>
}