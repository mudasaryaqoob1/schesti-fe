export type G703Row = [string, string, string, string, string, string, string, string, string];

export function rowTemplate(index: number): G703Row {
    return ['0', '0', `=0 + D${index}`, '0', '0', `=C${index} + D${index} + E${index}`, '0', '0', '0']
}