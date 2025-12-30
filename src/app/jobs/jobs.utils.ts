import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(timezone);
dayjs.extend(utc);

export const getDDay = (date: Date | string | null) => {
  if (!date) return '';
  const today = dayjs().startOf('day').tz('Asia/Seoul');
  const target = dayjs(date).startOf('day').tz('Asia/Seoul');
  const diff = target.diff(today, 'day');

  if (diff < 0) return '마감';
  if (diff === 0) return 'D-Day';
  return `D-${diff}`;
};

export const formatDate = (date: Date | string) => {
  return dayjs(date).tz('Asia/Seoul').format('YYYY.MM.DD');
};
