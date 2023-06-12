export const PriceFormat = (num) => {
  // return 'Rp.' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
