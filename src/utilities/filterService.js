export const platformUniqueFilter = (products) => {
  return Array.from(
    new Set(
      products.flatMap((product) => product.platform.toLowerCase().split(","))
    )
  );
};

export const genreUniqueFilter = (products) => {
  return Array.from(
    new Set(
      products.flatMap((product) => product.genre.toLowerCase().split(","))
    )
  );
};
