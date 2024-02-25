import dayjs from 'dayjs';

String.prototype.truncate = function (num: number) {
  if (this.length > num) {
    return (this.slice(0, num) + '...') as string;
  } else {
    return this as string;
  }
};

String.prototype.prettyMoney = function () {
  return this.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

String.prototype.prettyDate = function () {
  return dayjs(String(this)).format('DD/MM/YYYY');
};

Array.prototype.has = function (item) {
  if (!isEqualNoop) throw new Error('Missing isEqualKey!');
  return this.some(currentItem => isEqualNoop(item, currentItem));
};

const isEqualNoop = (a: any, b: any) => {
  return a?.id === b?.id;
};

const validateEmail = (value: string) => {
  // Định dạng email chuẩn
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(value) || 'Invalid email address';
};

export {isEqualNoop as isEqual, validateEmail};
