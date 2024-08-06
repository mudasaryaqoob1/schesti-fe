export const isObjectId = (id: string) => {
  // Check if the parameter value is a 24-character hexadecimal string
  return /^[0-9a-fA-F]{24}$/.test(id);
};

export function calculateProgressBarPercentage(
  totalDays: number,
  daysLeft: number
) {
  if (daysLeft < 0) {
    throw new Error('Days left cannot be negative');
  }

  const daysPassed = totalDays - daysLeft;
  const percentage = (daysPassed / totalDays) * 100;

  return percentage;
}

export function parseEmailFromQuery(email: string | null) {
  return email ? email.replace(/\s/g, '+') : '';
}
