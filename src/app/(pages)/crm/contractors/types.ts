import { ChooseFontType } from "@/app/component/fonts";
import { FileInterface } from "@/app/interfaces/file.interface";

export type StandardToolType =  "signature" | "initials" | "stamp" | "date";

export type ToolState = {
    tool: StandardToolType,
    position: { x: number, y: number },
    id: string;
    value?:string | FileInterface | {
        font:ChooseFontType;
        value:string;
    };
}

export type PdfContractMode = "add-values" | "edit-fields";