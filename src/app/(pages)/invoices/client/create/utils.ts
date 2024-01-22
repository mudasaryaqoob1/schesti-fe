export type G703State = {
    applicationNo: string,
    applicationDate: string,
    periodTo: string,
    projectNo: string;
    data: Array<G703Row>;
}
export type G703Row = [string, string, string, string, string, string, string, string, string];

export function rowTemplate(index: number): G703Row {
    return ['0', '0', `=0 + D${index}`, '0', '0', `=C${index} + D${index} + E${index}`, '0', '0', '0']
}