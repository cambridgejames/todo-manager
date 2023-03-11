export const formatTime = (format: string, date: Date): string => {
  const dict = {
    yyyy: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    H: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    MM: ("" + (date.getMonth() + 101)).substring(1),
    dd: ("" + (date.getDate() + 100)).substring(1),
    HH: ("" + (date.getHours() + 100)).substring(1),
    mm: ("" + (date.getMinutes() + 100)).substring(1),
    ss: ("" + (date.getSeconds() + 100)).substring(1)
  } as { [name: string]: string | number };
  return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, (match: string): string => {
    return dict[match].toString();
  });
};
