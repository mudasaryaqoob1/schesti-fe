import Dayjs, { type Dayjs as DayjsType } from 'dayjs';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin
import utc from 'dayjs/plugin/utc';

const dayjs = Dayjs;

dayjs.extend(utc);
// see: https://dayjs.gitee.io/docs/zh-CN/plugin/timezone
dayjs.extend(timezone);

export { dayjs };
export const disabledDate = (current: DayjsType, timezone = 'Asia/Karachi') => {
  return current.isBefore(dayjs().tz(timezone).startOf('day'), 'day');
};

export function getClientLocalTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
