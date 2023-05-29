export const getSortedProducts = (products, sortBy) => {
  if (sortBy === 'LOW_TO_HIGH')
    return [...products].sort(
      (item1, item2) => item1.discountprice - item2.discountprice,
    );
  if (sortBy === 'HIGH_TO_LOW')
    return [...products].sort(
      (item1, item2) => item2.discountprice - item1.discountprice,
    );
  if (sortBy === 'ALL') return products;

  return products;
};

export const getSearchedProducts = (products, searchText) => {
  return products?.filter((item) =>
    item?.name?.toLowerCase().includes(searchText.toLowerCase()),
  );
};

export const getFilteredProducts = (products, filters) => {
  return filters.length > 0
    ? [...products].filter((item) => filters.includes(item.categoryName))
    : products;
};

export const getFilteredPriceProducts = (products, price) => {
  return [...products].filter((item) => item.discountprice <= price);
};
