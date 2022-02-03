export const formatToThousands = (number: number, formatterChar: string = '.') => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, formatterChar);
};
