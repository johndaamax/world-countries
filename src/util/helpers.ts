export const formatToThousands = (number: number, formatterChar = '.'): string => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, formatterChar);
};

export const formatCountryLink = (countryName: string): string => {
  return countryName.toLowerCase().replaceAll(' ', '-');
};
