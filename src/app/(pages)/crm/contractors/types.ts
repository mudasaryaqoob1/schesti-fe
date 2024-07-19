export type StandardToolType =  "signature" | "initials" | "stamp" | "date";

export type ToolState = {
    tool: StandardToolType,
    position: { x: number, y: number },
    id: string
}

export type PdfContractMode = "add-values" | "edit-fields";