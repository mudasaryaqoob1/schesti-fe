export type G703State = {
    applicationNo: string,
    applicationDate: string,
    periodTo: string,
    projectNo: string;
    data: Array<G703Row>;
    phase: string;
}
export type G703Row = [string, string, string, string, string, string, string, string, string];

export function rowTemplate(index: number): G703Row {
    return ['0', '0', `=0 + D${index}`, '0', '0', `=C${index} + D${index} + E${index}`, `=(F${index} / B${index}) * 100`, `=B${index} - F${index}`, '0']
}