import React from "react";
import { useWishListByUser } from "../../hooks/product/useWishListByUser";
import FavoriteProductCard from "../../components/product-card/FavoriteProductCard";

const WishListPage = () => {
  const { list, deleteFavorite } = useWishListByUser();

  if (list === undefined) return <p>Loading...</p>;

  if (list.length === 0)
    return (
      <div>
        <p>Add items to display here...</p>
      </div>
    );

  console.log(list);
  return (
    <div className="container px-4 grid grid-cols-3">
      {list.map((wishItem, index) => (
        <FavoriteProductCard
          favorite={wishItem.product}
          key={index}
          onDeleteFavorite={() => deleteFavorite(wishItem.favoriteId)}
        />
      ))}
    </div>
  );
};

export default WishListPage;
