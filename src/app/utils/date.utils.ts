import { type RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';

export const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  const isPreviousDay = current < dayjs().add(-1, 'days');
  const isPreviousHour = current < dayjs().add(-1, 'hour');
  const isPreviousMinute = current < dayjs().add(-1, 'minute');
  return isPreviousDay || isPreviousHour || isPreviousMinute;
};
