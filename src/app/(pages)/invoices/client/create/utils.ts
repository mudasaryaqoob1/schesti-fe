
export function rowTemplate(index: number) {
  return [
    `${index}`,
    `item-${index}`,
    '',
    '',
    '',
    ``,
    ``,
    ``,
    ``,
  ];
}

export function generateData(): Array<string[]> {
  return Array.from({ length: 10 }).map((_, index) => {
    return rowTemplate(index);
  });
}
